const Discord = require('discord.js');
const { prefix} = require(`../../../config`);
const { Database } = require('xen.db');

const db = new Database("Database/command.db", { path: "Database", table: "JSON"});

module.exports = {
    name: 'deletecommand',
    aliases: ['delcmd'],
    description: '',
    category: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    meanz: async(client, message, args) =>{
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont the permission to use this command")

        let commandname = args[0]

        if(!commandname) return message.channel.send(`:x: Please give me the command name,\`delcmd <cmd_name>\``)


        let database = db.get(`command_${message.guild.id}`)

        if(database){
            let data = database.find(x => x.name === commandname.toLowerCase())

            if(!data) return message.channel.send("Unable to find the command")

            let value = database.indexOf(data)
            delete database[value]

            var filter = database.filter(x =>{
                return x != null && x != ''
            })

            db.set(`command_${message.guild.id}`, filter)

            return message.channel.send(`Deleted the **${commandname}** Command!`)


        }else {
            return message.channel.send("Sorry I'm unable to find that command,kindly please try again")
        }
    }
}