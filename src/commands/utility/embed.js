const Discord = require('discord.js');
const { prefix } = require(`../../../config`);

module.exports = {
    name: 'embed',
    aliases: ['em'],
    description: 'create-embed',
    category: 'utility',
    usage: `${prefix}embed JSON`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    meanz: async(client, message, args) =>{
        const targetChannel = message.mentions.channels.first()
        if (!targetChannel) {
            message.reply('Please specify a channel to send the embed in!')
            return
        }

        args.shift()

        try {

            const json = JSON.parse(args.join(' '))
            const { text = '' } = json

            targetChannel.send(text, {
                embed: json,
            })
        } catch (error) {
            message.reply(`INVAILD JSON ${error.message}`)
        }
    }
}