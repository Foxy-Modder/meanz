const Discord = require('discord.js')
const client = new Discord.Client({ disableMentions: "everyone" })
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
client.on('messageDelete', function (message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})

const Timers = new Map();

const distube = require("distube");
const player = new distube(client, { searchSongs: true });

player
  .on('playSong', (message, queue, song) => {
    message.channel.send(
      `${song.name} has started playing`)
  })
  .on("addList", (message, queue, playlist) => {
    message.channel.send(
      `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    );
  })
  .on("addSong", (message, queue, song) => message.channel.send(
    `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
  ))
  .on('empty', (message) => {
    message.channel.send(
      "Channel is empty. Leaving the channel"
    );
  })
  .on('error', (message, error) => {
    message.channel.send(`An error occured + ${error}`)
  })
  .on('finish', (message) => {
    message.channel.send('No more song in the queue')
  })
  .on("noRelated", message => message.channel.send("Can't find related video to play. Stop playing music."))
  .on("playList", (message, queue, playlist, song) => message.channel.send(
    `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
  ))
  .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
  .on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
  });
client.player = player;

client.login(config.token)

module.exports = {
  client,
  Timers,
}



