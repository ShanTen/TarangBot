const prefix = require('../config.json').preifx;
const makeEmbed = require('../helpScripts/embedWrapper')
const readjson = require('../helpScripts/readJSON');

module.exports = {
    name: 'regdata',
    description: `Gets  registrations.`,
    usage: `${prefix}regdata`,
    aliases: ['reg'],
    isPublic: false,
    getCommand(){
        return{
            execute(message, args, _config, _db){
                var returnStr = `Registrations: ${readjson(`./save.json`).registrationsCount}\nParticipants: ${readjson(`./save.json`).participants}`
                var embed = makeEmbed(message,"Registrations",returnStr,null,"#FF8000",null);
                message.channel.send(embed);
            }        
        }
    }
  }