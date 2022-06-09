const { MessageEmbed } = require("discord.js");

module.exports.RegisterEmbed = (wallet_address) => {
    const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('✅ Registration')
    .setDescription("You just have sucessfully registered a new account. You can find all new details below.")
    .setAuthor({ name: 'Lennard Dorst',  url: 'https://www.github.com/0w9/chandy' })
    .addFields(
        { name: '🔑 Public Key', value: wallet_address, inline: false },
        //{ name: '🔒 Secret Key', value: `You will recieve your secret key in your DMs (for security.)`, inline: false },
    )
    .setTimestamp()
    .setFooter({ text: 'Chandy Wallet, by Lennard Dorst.' })

    return embed;
}

module.exports.RegisterEmbed_secretKey = (secretKey) => {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('✅ Registration')
        .setDescription("You have just registered a new account. You can find the publicKey in the server you requested it, or using `/wallet`. We will provide you your secretKey here, so you can also add this account to your preferred wallet.\n\n⚠️ **Do NEVER SHARE THIS. Every person with this piece of text has acces to the account and this cannot be undone!")
        .setAuthor({ name: 'Lennard Dorst',  url: 'https://www.github.com/0w9/chandy' })
        .addFields(
            { name: '🔒 Private Key', value: `|| [${secretKey}] ||`, inline: false },
        )
        .setTimestamp()
        .setFooter({ text: 'Chandy Wallet, by Lennard Dorst.' })

    return embed;
}