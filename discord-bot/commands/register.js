const { SlashCommandBuilder } = require('@discordjs/builders');
const web3 = require("@solana/web3.js");
const {Keypair} = require("@solana/web3.js");
const { MessageEmbed } = require("discord.js");
const mariadb  = require("mariadb");

const client = require("../main.cjs");

const { RegisterEmbed_secretKey, RegisterEmbed } = require("../embeds/Register")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Starts the registration for a new user.'),
	async execute(interaction) {

        const new_wallet = web3.Keypair.generate();
		const wallet_address = new_wallet.publicKey.toString()
		const wallet_secret = Keypair.fromSecretKey(Uint8Array.from(new_wallet.secretKey)).secretKey;

		const registerDone_embed = RegisterEmbed(wallet_address)

		try {		

			mariadb.createPool({
				host: '127.0.0.1', 
				user:'root', 
				password: '',
				connectionLimit: 5
			}).getConnection().then(conn => {

				conn.query(`SELECT * FROM chandy.users WHERE discord_id = "${interaction.member.user.id}";`).then(res => {
					if(res[0]) {
						interaction.reply("You already are registered.")
					} else {
						if(res.affectedRows !== 0 ) {
							conn.query(`INSERT INTO chandy.users(wallet_pubKey, wallet_secretKey, discord_id) VALUES ("${wallet_address}","${wallet_secret}","${interaction.member.user.id}");`).then(res_2 => {
								interaction.reply({ embeds: [registerDone_embed], ephemeral: true})
							})	
						} else {
							interaction.reply("Error.")
						}
					}
				})
			})
		} catch (e) {console.log(e)}
	},
};
