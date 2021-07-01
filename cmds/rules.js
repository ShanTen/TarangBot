//GET EVENT RULES

const prefix = require('../config.json').preifx;
const makeEmbed = require('../helpScripts/embedWrapper');

const getEventRulesObj = require('../helpScripts/getEventRulesObj');
const eventRulesAbsPath = './Rules-tarang.txt';
const eventData = getEventRulesObj(eventRulesAbsPath); //loaded only once UwU so async not really reqd.

module.exports = {
    name: 'rules',
    description: `Get rules about an event. `,
    usage: `${prefix}rules <Event Name>`,
    aliases: ['roolz'], //#Quirkyh! 😜😝😝
    isPublic: true,
    getCommand() {
        return {
            execute(message, args, _config, _db) {

                let eventName;

                if (!args[0]) eventName = 'GENERAL';
                else eventName = args[0].toUpperCase();

                let eventKeys = Object.keys(eventData);

                for (eventKey of eventKeys) {
                    if (eventKey.includes(eventName)) {
                        var helpEmbed = makeEmbed(message, eventKey, eventData[eventKey]);
                        message.channel.send(helpEmbed);
                        return;
                    }
                }

                // console.log(eventName);
                // console.log(eventKeys)
                message.channel.send('Event Not Found :(');
                return;
            }
        }
    }
}