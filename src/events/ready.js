const { client } = require("../../Meanz")
const { prefix } = require("../../config")

client.on("ready", () => {
    console.log(`${client.user.tag} is online on ${client.guilds.cache.size} servers!`)
    client.user.setPresence("dnd");
    client.user.setActivity(`${client.guilds.cache.size}|| ${prefix}help`, { type: "LISTENING" });
})
