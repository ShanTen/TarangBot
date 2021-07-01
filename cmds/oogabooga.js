//GET SHITPOST
const prefix = require('../config.json').preifx;

module.exports = {
    name: 'oogabooga',
    description: `Monke tiem.`,
    usage: `${prefix}oogabooga`,
    aliases: ['ooogs', 'ogbg', "ungabunga", "unga", "oogs"],
    isPublic: false,
    getCommand() {
        return {
            execute(message, args) {
                message.channel.send(`***Confussed Unga Bunga??***`);
                message.reply('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.iGCboJbN7E87UBI1fi_D2AHaEa%26pid%3DApi&f=1');
            }
        }
    }
}