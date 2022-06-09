const { SlashCommandBuilder } = require('@discordjs/builders');
const web3 = require("@solana/web3.js");
const {Keypair} = require("@solana/web3.js");
const { MessageEmbed } = require("discord.js");

const client = require("../main.cjs");

const { RegisterEmbed_secretKey, RegisterEmbed } = require("../embeds/Register")

module.exports = {
	data: 	new SlashCommandBuilder().setName('lookup')
	.setDescription('View information about any account.')
	.addStringOption(option =>
		option.setName('address')
		.setDescription('The public key to lookup.')
		.setRequired(true)),

	async execute(interaction) {

		interaction.reply(interaction.options.getString("address"))
	},
};
