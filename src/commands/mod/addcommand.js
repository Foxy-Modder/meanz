const Discord = require('discord.js');
const { prefix} = require(`../../../config`);
const { Database } = require('xen.db');

const db = new Database("Database/command.db", { path: "Database", table: "JSON"});

module.exports = {
    name: 'addcommand',
    aliases: ['addcmd'],
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

        if(!commandname) return message.channel.send(`:x: You have to give command name,\`addcmd <cmd_name> <cmd_responce>\``)

        let commandresponce = args.slice(1).join(" ")

        if(!commandresponce) return message.channel.send(`:x: You have to give command cmd responce, \`addcmd <cmd_name> <cmd_responce>\``)

        let database = db.get(`command_${message.guild.id}`)

        if(database && database.find(x => x.name === commandname.toLocaleLowerCase())) return message.channel.send(":x: This command is already added in the guild")

        let data = {
            name: commandname.toLowerCase(),
            responce: commandresponce
        }
        db.push(`command_${message.guild.id}`, data)

        return message.channel.send("Added **" + commandname.toLowerCase() + "** as a custom command in guild.")
    }
}