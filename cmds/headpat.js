//GET HEADPAT
const prefix = require('../config.json').preifx;

module.exports = {
    name: 'headpat',
    description: `Emotional Support.`,
    usage: `${prefix}headpat`,
    aliases: ['patpat', 'hp'],
    isPublic: true,
    showInHelp: true,
    getCommand() {
        return {
            execute(message, args) {
                message.react('😁');
                message.channel.send(`Here you go UwU`);
                message.reply('https://tenor.com/view/big-hero6-baymax-there-there-patting-head-pat-head-gif-4086973');
            }
        }
    }
}