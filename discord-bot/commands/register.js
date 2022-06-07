const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Starts the registration for a new user.'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
