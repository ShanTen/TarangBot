//its 2:54AM and I cannot sleep
const prefix = require('../config.json').preifx;
const makeEmbed = require('../helpScripts/embedWrapper');
const readjson = require('../helpScripts/readJSON');

module.exports = {
    name: 'stats',
    description: `Get stats of commands used by the bot`,
    usage: `${prefix}stats`,
    aliases: ['commands_usage'],
    isPublic: false,
    showInHelp: false,
    getCommand() {
        return {
            execute(message, args, _config) {
                var stats = readjson('../stats.json');

                var vecArr = [];
                for(_cmd of Object.keys(stats)) {
                    let useCount = stats[_cmd];
                    vecArr.push([_cmd,useCount])
                }
                var embed = makeEmbed(message, "Stats", "Number of times common commands have been used: ", null, null, null, vecArr);
                message.channel.send(embed)
                return;
            }
        }
    }
}