const { client } = require("../../Meanz")


client.on("guildMemberAdd", async (member) => {
    const background = ''
    const avatar = member.user.displayAvatarURL({ dynamic: false })
    const title = member.user.username
    const Member12 = member.guild.memberCount
    const sub = `Member ${Member12}`
    const color = 'FFFFFF'
    const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/welcomebanner?background=${background}&avatar=${avatar}&title=${title}&subtitle=${sub}&textcolor=${color}`, {
        headers: {
            'APIKEY': 'e6jLOW659nVsQ4EUIM9HrX2iDrsawZIjRL8LDt9Q'
        }
    })


    const channelID = 'replace this with your channel id'
    const Wchannel = member.guild.channels.cache.get(channelID);
    let Image = await res.buffer();
    const WImage = new Discord.MessageAttachment(Image);
    Wchannel.send(WImage);

})

