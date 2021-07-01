const Discord = require('discord.js');
//field vector array is an array containing vecotrs => ({prefix}cmdName,desk)
function makeEmbed(msgObj,_title,_description,_thumbnailLink="",_hex_color="#FF8000",_image="",InlinefieldVectorArr){
    var embed = new Discord.MessageEmbed();

    embed
    .setTitle(_title)
    .setDescription(_description)
    .setThumbnail(_thumbnailLink)
    .setColor(_hex_color)
    .setImage(_image);

    if(InlinefieldVectorArr){
        for(var v of InlinefieldVectorArr){
            embed.addFields({name: v[0], value: v[1], inline: false})
        }
    }

    return embed
}

module.exports = makeEmbed;

// Unused Code:
//var iconUrl = `https://cdn.discordapp.com/avatars/${msgObj.author.id}/${msgObj.author.avatar}.png?size=256`
//console.log(iconUrl) debug
//var _authorArr=[msgObj.author.username,iconUrl];
// console.log(_description);  
// .setAuthor(_authorArr[0],_authorArr[1],_authorArr[2])
// .setTimestamp()