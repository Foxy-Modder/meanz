const { MessageEmbed } = require('discord.js')
const config = require('../../../config')
const { Database } = require('quickmongo');

const db = new Database(config.dblink)

module.exports = {
    name: "balance",
    aliases: ["bal"],
    category: "Economy",
    description: "Show you how much credit you have!",
    usage: "<prefix> bal",
    meanz: async(client, message, args) =>{

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
        let bal = await db.fetch(`money_${user.id}`)
        if (bal === null) bal = '0';

        let bank = await db.fetch(`bank_${user.id}`)
        if (bank === null) bank = '0';

        const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Balance`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
💸 Wallet:- **${bal}:moneybag:**
🏦 Bank:- **${bank}:moneybag:**
        `)
        message.channel.send(embed)
    } // Keep Any Money Symbol, I kept $ Because Its Easy To Write Here
}