const { MessageEmbed } = require('discord.js')
const config = require('../../../config')
const { Database } = require('quickmongo');

const db = new Database(config.dblink)

module.exports = {
  name: "addmoney",
  aliases: ['addm'],
  category: "Economy",
  description: "Add Balance",
  usage:"addMoney userID / addMoney @user",
  meanz: async(client, message, args) =>{
    if(message.author.id !== config.owner) return message.channel.send('Owner only commands'); 
    let user;
    if(args[0] && isNaN(args[0])) user = message.mentions.users.first() || message.author
    if(args[0] && !isNaN(args[0])){
        user = client.users.cache.get(args[0])
        if(!message.guild.members.cache.has(args[0])) return message.reply(":x: User not found")
    
    }
    
    let money = args[1]
    if(!user) return message.reply(":x: You must mention user or enter userID")
    if(user.bot) return message.reply(":x: User is bot :)")
    if(!money) return message.reply(":x: You must enter an amount")
    if(isNaN(money)) return message.reply(":x: You must enter valid an amount")
    if(money < 0) return message.reply("I can't add :)")
    db.add(`money_${user.id}`, parseInt(money))
    message.react("✅")
    }
    
  
}