const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const mariadb  = require("mariadb");

const {getWallet_byId} = require("../helpers/database/User")

module.exports = {
  data: new SlashCommandBuilder().setName("mint")
    .setDescription("Mint NFTs, only from discord")
    .addStringOption(option => option.setName("collection").setDescription("The collection you would like to mint.").setRequired(true)),

  async execute(interaction) {
        try {
            mariadb.createPool({host: '127.0.0.1', user:'root', password: '',connectionLimit: 5}).getConnection().then(conn => {
                conn.query(`SELECT * FROM chandy.users WHERE discord_id = "${interaction.member.user.id}";`).then(res => {
                    if(res[0]["wallet_pubKey"]) {
                        const wallet_address = res[0]["wallet_pubKey"]
                            
                        interaction.reply(wallet_address)
                    }    
                })
            })
        } catch (e) {console.log(e)}
    
  }
}
