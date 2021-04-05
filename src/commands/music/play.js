const Discord = require('discord.js');
const { prefix } = require(`../../../config`);


module.exports = {
    name: 'play',
    aliases: [' '],
    description: '',
    category: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    meanz: async(client, message, args) =>{
        if (!message.member.voice.channel)
            return message.channel.send("You need to join a voice channel to use this command")

        const query = args.join(" ")
        if(!query) return message.channel.send("Please give the song name")

        await client.player.play(message, query);
    }
}