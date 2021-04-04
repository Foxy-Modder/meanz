const { MessageEmbed } = require('discord.js');
const  config  = require(`../../../config`);
const { create } = require("sourcebin")

module.exports = {
    name: 'create-bin',
    aliases: ['cb'],
    description: 'create bin for a code',
    category: 'utility',
    usage: 'cb <code>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    meanz: async(client, message, args) =>{
        let codeargs = args.join(" ").split("/");
        let content = codeargs[0];
        let language = codeargs.slice(1).join(" ")

        if(!content) {
            return message.reply(new MessageEmbed()
            .setTitle(`No content was provided`)
            .setFooter()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`**Please provide a content [that is the code]\n\nUsage: ${config.prefix}upload <code>\n\nExample: ${config.prefix}upload System.out.println("Hello");/Java**`));
        } else if(!language) {
            return message.reply(new MessageEmbed()
            .setTitle(`No language was provided`)
            .setFooter()
            .setTimestamp()
            .setColor('RED')
            .setDescription(`**Please provide the language of the code\n\nUsage: ${config.prefix}upload <code>/<language>\n\nExample: System.out.println("Hello");/Java**`));
        } else {
            create(
                [
                    {
                        name: `${message.author.tag}'s code`,
                        content,
                        language,
                    },
                ],
                {
                    title: `Hey there ${message.author.tag}! Your code has been uploaded to sourcebin`,
                    description: `Have a nice day ahead!!!`
                }
            ).then((value) => {
                message.channel.send(new MessageEmbed()
                .setTitle(`Click me to view your code`)
                .setColor('GREEN')
                .setURL(value.url)
                .setDescription(`**Your code has been uploaded.\nThank you for using me!!!**`)
                .setFooter(embed.footerRelated.footerText, embed.footerRelated.footerIcon)
                .setTimestamp()
                )
            })
        }
    }
}