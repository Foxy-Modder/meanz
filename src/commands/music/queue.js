const Discord = require('discord.js');
const { prefix } = require(`../../../config`);

module.exports = {
    name: 'queue',
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

            

            let queue = client.player.getQueue(message);
            let embed = new Discord.MessageEmbed()
            .setTitle("Current Queue:")
            .setDescription(queue.songs.map((song, id) => {
                return `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
            }).join("\n"))
            
            return message.channel.send(embed)
    }
}