const config = require("../../config")
const { client } = require("../../Meanz")
const { Database } = require('xen.db');

const db = new Database("Database/command.db", { path: "Database", table: "JSON"});

client.on("message", async (message) => {
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '804014619915714571') return message.channel.send(`Prefix in ${message.guild.name} is **${prefix}**.`)
    }
    let prefix;
// no one did =setprefix
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    if(prefixes == null) {
        prefix = config.prefix // this will be the default prefix
    } else {
        prefix = prefixes;
    }

    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    let commandx = await db.get(`command_${message.guild.id}`)

    if(commandx){
        let commandy = commandx.find(x => x.name === command)
        if(commandy) message.channel.send(commandy.responce)
    }

    let commandName = client.commands.get(command);

    if (!commandName) commandName = client.aliases.get(command);

    if (commandName) commandName.meanz(client, message, args);

})
