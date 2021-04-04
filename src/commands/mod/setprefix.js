const Discord = require('discord.js');
const { prefix } = require(`../../../config`);
const { Database } = require('xen.db');

const db = new Database("Database/command.db", { path: "Database", table: "JSON"});

module.exports = {
    name: 'setprefix',
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
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('you dont have perm to use this cmd')

        const newprefix = args[0] // =setprefix [args0] [args1] [args2] \\ =setprefix ! <= args0
    
        if(!newprefix) return message.reply('please provide a new prefix')
    
        if(newprefix.length > 5) return message.channel.send("this prefix is too long")
    
        message.channel.send(`new prefix set to ${newprefix}`)
        db.set(`prefix_${message.guild.id}`, newprefix);
    }
}