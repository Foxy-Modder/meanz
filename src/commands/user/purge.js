const Discord = require('discord.js');
const { prefix } = require(`../../../config`);
const { sleep } = require('../../../function/sleep')

module.exports = {
    name: 'purge',
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
        if (!message.member.hasPermission("MANAGE_CHANNELS") && message.author.id !== '553812924595175435') {
            return message.channel.send("You dont have the permission to use this commands!")
        }

        if (!args[0]) return message.reply("Please enter the amount of messages to clear!");

        if (isNaN(args[0])) return message.reply("Please type a real number!");

        if (args[0] > 100) return message.reply("You can't remove more than 1000 messages!");

        if (args[0] < 1) return message.reply("You have to delete at least one message!");

        await message.channel.send(`Scanning the server`)
        .then(async msg => {
            await sleep(1500);
            await msg.edit(`[▖] Counting the message that needs to delete`)
            await sleep(2000);
            await msg.edit(`[▘] Done!`)
            await sleep(2500);
            await msg.edit(`[▝] Message Delete`)
            await sleep(2000);
        })
        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages)
        });
    }
}