//its 2:54AM and I cannot sleep
const prefix = require('../config.json').preifx;

module.exports = {
    name: 'goodbot',
    description: `Appreciate the bot!`,
    usage: `${prefix}goodbot`,
    aliases: ['gbot', 'gb'],
    isPublic: true,
    showInHelp: false,
    getCommand() {
        return {
            execute(message, args, _config) {
                message.react('😁');
                var gbCount = require('../stats.json')["goodbot"];
                message.channel.send("`Thanks for the appreceashun 🥰 ! I have been appreciated " + gbCount.toString() + " times!`")
                return;
            }
        }
    }
}