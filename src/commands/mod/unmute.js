const Discord = require('discord.js');
const { prefix } = require(`../../../config`);

module.exports = {
    name: 'unmute',
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
        if (!message.content.startsWith(prefix)) return

        let Member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);

        if (!Member) return message.channel.send(`Please Mention A User!`);

        let role = message.guild.roles.cache.find(role => role.name === "muted") || message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
        if (!role)
            return message.channel.send(
                `There Is No Mute Role!`
            );



        let Embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Member Unmuted!`)
            .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
            .addField(`Unmuted Member`, `${Member.user.tag} (${Member.user.id})`)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp();

        if (role && Member.roles.cache.has(role)) {
            Member.roles.remove(role);
            return message.channel.send(Embed);

        }
    }
}
