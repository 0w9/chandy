const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const mariadb  = require("mariadb");

const {getWallet_byId} = require("../helpers/database/User")

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
                        const wallet_address = res[0]["wallet_pubKey"]
                            
                        console.log(`${interaction.member.user.id} is sending ${interaction.options.getString("amount")} SOL to ${interaction.options.getUser('reciever').id}`)
                    }    
                })
            })
        } catch (e) {console.log(e)}
    
  }
}
