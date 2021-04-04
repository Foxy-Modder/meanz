const Discord = require('discord.js');
const { prefix } = require(`../../../config`);
const { sleep } = require('../../../function/sleep')

module.exports = {
    name: 'hack',
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
        const hacked = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const genemail = [
            'noobs@'
        ]
        const genending = [
            'gmail.com'
        ]
        const genpass = [
            '82jfsk9aw1l'
        ]
        await message.channel.send(`Hacking ${hacked.user.username} now...`)
        .then(async msg => {
            await sleep(1500);
            await msg.edit(`[▖] Finding discord login... (2fa bypassed)`)
            await sleep(2000);
            await msg.edit(`[▘] Found:\n**Email:** \`${genemail}${genending}\`\n**Password:** ${genpass}`)
            await sleep(2500);
            await msg.edit(`[▝] Fetching DM's with closest friends (They have no friends)`)
            await sleep(2000);
            await msg.edit(`Succesfully hacked ${hacked.user.username}`)
            await sleep(2000);
        })
    }
}