//GET About?!

const prefix = require('../config.json').preifx;

module.exports = {
    name: 'about',
    description: `Find out about the jobless human made this thing.`,
    usage: `${prefix}about`,
    aliases: ['abt'],
    isPublic: true,
    showInHelp: true,
    getCommand() {
        return {
            execute(message, args, _config, _db, Discord) {
                const commands = message.client.commands;
                let iconUrl = `https://cdn.discordapp.com/avatars/504707691428446221/a_250d896ab25aa6bf7eca4a2c5311ac93.png?size=256`;
                var embed = new Discord.MessageEmbed()
                embed
                    .setAuthor(`Shantanu R`, iconUrl)
                    .setTitle('**About**')
                    .setColor("#FF8000")
                    .setDescription(`Hi, I'm Shantanu R of class 12\n-debater, quizzer,  **g a m e r**   and failed SPL candidate, the creator of this...*thing*..?\nI hosted Tarang Bot last year and made this year's using discord.js and js.\nWhy? Mostly due to very high self loathing tendencies...\n\n\nMy ig: @ddosouttaexistence\nBot repo: <https://github.com/shanTen/TarangBot>\n\nps thanks vert for help with the data parser
                `)
                message.channel.send(embed);
            }
        }
    }
}