const { SlashCommandBuilder } = require('@discordjs/builders');
const web3 = require("@solana/web3.js");
const {Keypair} = require("@solana/web3.js");

const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Starts the registration for a new user.'),
	async execute(interaction) {

        const new_wallet = web3.Keypair.generate();
		const wallet_address = new_wallet.publicKey.toString()
		const wallet_secret = Keypair.fromSecretKey(Uint8Array.from(new_wallet.secretKey)).secretKey;

		const registerDone_embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('✅ Registration')
		.setDescription("You just have sucessfully registered a new wallet. You can find all new details below.")
		.setAuthor({ name: 'Lennard Dorst',  url: 'https://www.github.com/0w9/chandy' })
		.addFields(
			{ name: '🔑 Public Key', value: wallet_address, inline: false },
			//{ name: '🔒 Private Key', value: ``, inline: false },
		)
		.setTimestamp()
		.setFooter({ text: 'Chandy Wallet, by Lennard Dorst.' });

		await interaction.reply({ embeds: [registerDone_embed], ephemeral: true})
	},
};
