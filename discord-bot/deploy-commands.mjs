import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config'

const commands = [
  new SlashCommandBuilder().setName('register').setDescription('Starts the registration for a new user.'),
  new SlashCommandBuilder().setName('lookup').setDescription('View information about any account.').addStringOption(option => option.setName('address').setDescription('The public key to lookup.').setRequired(true)),
  new SlashCommandBuilder().setName('mint').setDescription('Mint NFTs, only from discord.').addStringOption(option => option.setName('collection').setDescription('The collection you would like to mint.').setRequired(true)),
  new SlashCommandBuilder().setName("send").setDescription("Send solana to other users.").addUserOption(option => option.setName("reciever").setDescription("The reciever you would like to send to.").setRequired(true)).addStringOption(option => option.setName("amount").setDescription("How many SOLANA you would like to send,").setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
