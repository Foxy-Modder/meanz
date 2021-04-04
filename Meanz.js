const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config.js')
const glob = require('glob')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

glob(__dirname + '/src/commands/*/*.js', function (err, files) {
    if (err) console.log(err)
    files.forEach(f => {
      let props = require(f.replace('.js', ''))
      client.commands.set(props.name, props)
      for (const aliase of props.aliases)
      client.aliases.set(aliase, props)
    })
  })

fs.readdir("./src/events/", (err, files) => {
    if (err) console.log(err)
    const eventsFile = files.filter(file => file.split(".").pop() == "js")
    if (eventsFile.length <= 0) return
    eventsFile.forEach((file) => {
        require("./src/events/" + file)
    })
})

client.snipes = new Map();
client.on('messageDelete', function(message, channel){
client.snipes.set(message.channel.id,{
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})

const Timers = new Map();

client.login(config.token)

module.exports = {
    client,
    Timers
}



