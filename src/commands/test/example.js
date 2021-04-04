const Discord = require('discord.js')
require("../../../function/extendedmessage");
module.exports = {
  name: 'template',
  aliases: [''],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  meanz: async(client , message , args) =>{
 message.inlineReply("no u", { allowedMentions: { repliedUser: false } })
  }
}