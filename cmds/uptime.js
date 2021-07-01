//GET UPTIME
const prefix = require('../config.json').preifx;
module.exports = {
    name: 'uptime',
    description: `Bot uptime.`,
    usage: `${prefix}uptime`,
    aliases: ['up', 'ut'],
    isPublic: false,
    getCommand() {
        return {
            execute(message, args, _config, _db) {
                var days = 0;
                var hours = 0;
                var minutes = 0;
                var now;

                now = new Date();
                var seconds = Math.floor(Math.abs(now - _config.startTime) / 1000); //in ms thus we conv to sec by /1000

                //Nightmare fuel [I didnt use modulus because its funny]
                if (seconds >= 60) {
                    minutes = Math.floor(seconds / 60);
                    seconds = (seconds - (minutes * 60)) //only excess here
                    if (minutes >= 60) {
                        hours = Math.floor(minutes / 60);
                        minutes = (minutes - (hours * 60)) //only mins here
                        if (hours >= 24) {
                            days = Math.floor(hours / 24);
                            hours = hours - (days * 24)
                        }
                    }
                }

                message.channel.send(`Up for ${days} days ${hours}hrs ${minutes}mins ${seconds}s`);
            }
        }
    }
}