const { prefix, dblink } = require("../../config")
const { client } = require("../../Meanz")
const { Database } = require('xen.db');

const db = new Database()

const fetch = require("node-fetch"); // npm i node-fetch

client.on('message', async message => {
    let channel = await db.get(`chatbot_${message.guild.id}`)
    if(channel == null) return; // Channel ID
    if(message.channel.id === channel) {
        if(message.author.bot) return
        fetch(
            `https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(message)}&uid=000` // API For ChatBot
        )
            .then((res) => res.json())
            .then(async (json) => {
                return message.channel.send(`> ${message}\n${json.response}`); // User Message+Reply
            });
    }
})