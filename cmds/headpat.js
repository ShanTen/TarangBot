//GET HEADPAT
const prefix = require('../config.json').preifx;

module.exports = {
    name: 'headpat',
    description: `Emotional Support.`,
    usage: `${prefix}headpat`,
    aliases: ['patpat', 'hp'],
    isPublic: true,
    getCommand() {
        return {
            execute(message, args) {
                message.react('😁');
                message.channel.send(`Here you go UwU`);
                message.reply('https://tenor.com/view/gawr-gura-homework-gif-20431859');
            }
        }
    }
}