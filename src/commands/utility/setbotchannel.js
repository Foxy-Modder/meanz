const Discord = require('discord.js');
const { prefix, dblink } = require(`../../../config`);///optional
const { Database } = require('quickmongo');

const db = new Database(dblink)
module.exports = {
    name: 'setupbot',
    aliases: ['setbot', 'setbots'],
    description: 'set the channel for the ai bot',
    category: 'moderation',
    usage: `${prefix}set-bot #channel`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    meanz: async(client, message, args) =>{
        if (!message.member.hasPermission('MANAGE_CHANNELS')|| message.author.id !== '553812924595175435') return message.channel.send('You do not have permissions to use this command :/')///message.author.id is not necessary u can just put the permission for it
        let channel = message.mentions.channels.first() 
        if (!channel) return message.channel.send('Please mention the channel you want to set the chatbot area')

        await db.set(`chatbot_${message.guild.id}`, channel.id)
        message.channel.send(`${channel} has been set as the chatbot area`)
    }
}