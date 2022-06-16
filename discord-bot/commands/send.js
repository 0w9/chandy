const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const mariadb  = require("mariadb");
const {Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL} = require("@solana/web3.js");
const {sendAndConfirmTransaction, clusterApiUrl, Connection} = require("@solana/web3.js");
const {getWallet_byId} = require("../helpers/database/User")
const { SentEmbed, SendingEmbed } = require("../embeds/Send");

module.exports = {
  data: new SlashCommandBuilder().setName("send")
    .setDescription("Send solana to other users.")
    .addUserOption(option => option.setName("reciever").setDescription("The reciever you would like to send to.").setRequired(true))
    .addStringOption(option => option.setName("amount").setDescription("How many SOLANA you would like to send,").setRequired(true)),

  async execute(interaction) {
        try {
            mariadb.createPool({host: '127.0.0.1', user:'root', password: '',connectionLimit: 5}).getConnection().then(conn => {
                conn.query(`SELECT * FROM chandy.users WHERE discord_id = "${interaction.options.getUser("reciever").id}";`).then(res => {

                    if(res[0]["wallet_pubKey"]) {
                        const wallet_address_reciever = res[0]["wallet_pubKey"]
                            
                        interaction.reply({ embeds: [SendingEmbed(interaction.options.getUser("reciever"), interaction.user, Number(interaction.options.getString("amount")))]});
                        

                        conn.query(`SELECT * FROM chandy.users WHERE discord_id = "${interaction.user.id}";`).then(res_2 => {
                            if(res_2[0]["wallet_pubKey"]) {
                                
                                let fromKeypair = Keypair.fromSecretKey(Uint8Array.from([205,106,233,73,21,121,117,46,15,77,62,33,161,214,66,93,42,70,245,143,161,0,231,179,194,140,163,59,241,51,55,85,114,59,253,28,96,193,188,74,105,46,150,89,254,8,209,37,124,195,54,239,1,240,21,166,231,183,153,25,131,110,90,4]))

                                let transaction = new Transaction();
        
                                transaction.add(
                                SystemProgram.transfer({fromPubkey: fromKeypair.publicKey,toPubkey: wallet_address_reciever,lamports: 0.1 * LAMPORTS_PER_SOL })); 

                                let connection = new Connection(clusterApiUrl('devnet'));
                                console.log(fromKeypair.publicKey.toString());

                                sendAndConfirmTransaction(connection,transaction,[fromKeypair]).then(r => {
                                    console.log(r)
                                    interaction.editReply({embeds: [SentEmbed(interaction.options.getUser("reciever"), interaction.user, r, Number(interaction.options.getString("amount")))]})
                                });
                            }
                        })

                    }    
                })
            })
        } catch (e) {console.log(e)}
    
  }
}
