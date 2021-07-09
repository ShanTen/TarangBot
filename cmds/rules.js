//GET EVENT RULES
const prefix = require('../config.json').preifx;
const makeEmbed = require('../helpScripts/embedWrapper');

const getEventRulesObj = require('../helpScripts/getEventRulesObj');
const eventRulesAbsPath = './Rules-tarang.txt';
const eventData = getEventRulesObj(eventRulesAbsPath); //loaded only once UwU so async not really reqd.

module.exports = {
    name: 'rules',
    description: `Get the rules and details about an event or just Tarang in genral`,
    usage: `${prefix}rules <Event Name>`,
    aliases: ['roolz'], //#Quirkyh! 😜😝😝
    isPublic: true,
    showInHelp: true,
    getCommand() {
        return {
            execute(message, args, _config, _db) {

                let eventName;

                if (!args[0] || args[0].toLowerCase()===`tarang` || args[0].toLowerCase()===`general`) eventName = 'GENERAL';
                else if(args[0].length < 3) {
                    message.channel.send(`There's and event that's less than three   Letters Long?`).then(_type => _type.delete());
                    message.channel.send(`Invalid Event!`);
                    return;
                }
                else eventName = args[0].toUpperCase();

                let eventKeys = Object.keys(eventData);

                for (eventKey of eventKeys) {
                    if (eventKey.includes(eventName)) {
                        var helpEmbed = makeEmbed(message, eventKey, eventData[eventKey]);
                        message.channel.send(helpEmbed);
                        return;
                    }
                }
                message.channel.send('Event Not Found :(');
                return;
            }
        }
    }
}

//Unused/Debug
// console.log(eventName);
// console.log(eventKeys)