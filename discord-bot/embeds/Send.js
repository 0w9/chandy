const { MessageEmbed } = require("discord.js");

module.exports.SendingEmbed = (reciever, sender, amount) => {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('✅ Sending')
        .setDescription("Your transaction just was started! Waiting for confirmation")
        .addFields(
            { name: 'Reciever', value: `${reciever}`, inline: false },
            { name: 'Sender', value: `${sender}`, inline: false },
            { name: 'Amount', value: `${amount} $SOL`, inline: false },
        )
        .setTimestamp()
        .setFooter({ text: 'Chandy Wallet, by Lennard Dorst.' })

    return embed;
}

module.exports.SentEmbed = (reciever, sender, txhash, amount) => {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('✅ Sent')
        .setDescription("Your transaction just was confirmed! \nHash: `" + sender + "`")
        .addFields(
            { name: 'Reciever', value: `${reciever}`, inline: false },
            { name: 'Sender', value: `${sender}`, inline: false },
            { name: 'Amount', value: `${amount} $SOL`, inline: false },
        )
        .setTimestamp()
        .setFooter({ text: 'Chandy Wallet, by Lennard Dorst.' })

    return embed;
}