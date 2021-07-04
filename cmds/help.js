//GET HELP?!

const prefix = require('../config.json').preifx;
const makeEmbed = require('../helpScripts/embedWrapper')

module.exports = {
    name: 'help',
    description: `This Command.`,
    usage: `${prefix}help`,
    aliases: ['info'],
    isPublic: true,
    showInHelp: true,
    getCommand() {
        return {
            execute(message, args, _config, _db) {

                const commands = message.client.commands;

                var returnStr = '';
                var fvecArr = [];

                for (var vec of commands) {
                    var cmdObj = vec[1];

                    if (cmdObj.showInHelp)
                        fvecArr.push([cmdObj.usage, cmdObj.description]);
                }

                var link = "https://media.discordapp.net/attachments/760397626930888724/851481404717269012/gradientDiscIcon.png?width=671&height=670";
                var embed = makeEmbed(message, "Here are the list of commands avaialble and their uses!", returnStr, null, "#FF8000", null, fvecArr);
                message.channel.send(embed);
            }
        }
    }
}