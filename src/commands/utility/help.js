const DJS = require("discord.js")
const { prefix } = require("../../../config")

module.exports = {
    name: "help",
    aliases: [''],
    description: "Shows The List Of My Command",
    usage: "help <Command>",
    category: "Utility",
    /**
     * 
     * @param {DJS.Client} client 
     * @param {DJS.Message} message 
     * @param {String[]} args 
     */
    meanz: async(client, message, args) =>{

        if (args[0]) {
            const command = await client.commands.get(args[0]) || await client.commands.get(client.aliases.get(args[0]));

            if (!command) {
                return message.channel.send("Unknown Command: " + args[0]);
            }

            let alias = command.aliases
            if (!alias) {
                alias = "Not Provided"
            }


            let embed = new DJS.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(`\`${prefix}${command.name}\``)
                .addField("Description", `${command.description}` || "Not Provided")
                .addField("Category", command.category || "Unknown")
                .addField("Aliases", `\`${alias.join("`, `") || "Not Provided"}\``)
                .addField("Usage", `\`${command.usage || "Not Provided"}\``)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor("BLURPLE")
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL());

            return message.channel.send(embed);
        } else {
            const commands = await client.commands;

            let emx = new DJS.MessageEmbed()
                .setTitle("My Commands")
                .setDescription(
                    `Use **${prefix}help <Command>** For More Info.`
                )
                .setColor("BLURPLE")
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(client.user.displayAvatarURL());

            let com = {};
            for (let comm of commands.array()) {
                let category = comm.category || "Unknown";
                let name = comm.name;

                if (!com[category]) {
                    com[category] = [];
                }
                com[category].push(name);
            }

            for (const [key, value] of Object.entries(com)) {
                let category = key;

                let desc = "`" + value.join("`, `") + "`";

                emx.addField(`${category} [${value.length}]`, desc);
            }





            return message.channel.send(emx);
        }
    }


}