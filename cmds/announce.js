//MAKE Announcement
const prefix = require('../config.json').preifx;
const makeEmbed = require('../helpScripts/embedWrapper')
const BotMessagesChannelID = require('../serverConfig.json').BotMessaagesChannel;

//Long/delayed VERSION OF ANNOUNCEMENT COMMAND
module.exports = {
    name: 'announce',
    description: `Bot Sends Announcement `,
    usage: `${prefix}announce`,
    aliases: ['botann', 'ann'],
    isPublic: false,
    getCommand() {
        return {
            progressInt: 0,
            author: 0,
            messages: [],
            execute(message, args, _config, _db, discInstance) {

                this.messages.push(message)

                if (message.content === "go back") {
                    if (this.progressInt > 0) {
                        this.progressInt -= 1;
                        return this;
                    }
                }

                if (this.progressInt === 0) {
                    let filter = m => m.author.id === message.author.id
                    this.author = filter;
                    this.progressInt += 1;
                    message.channel.send(`Enter Channel Mention <@${message.author.id}>: `).then(_type => this.messages.push(_type));

                    return this;
                }

                else if (this.progressInt === 1) //get announce channel
                {
                    if (message.content.startsWith("<#") && message.content.endsWith(">")) {
                        message.channel.send(`Enter Announcement Title <@${message.author.id}> : `).then(_type => this.messages.push(_type));
                        this.AnnouncementChannelID = message.content.slice(2, message.content.length - 1);
                        this.progressInt++;
                    }
                    else {
                        message.channel.send(`Enter Valid ID! <@${message.author.id}>`).then(_type => this.messages.push(_type));
                    }
                    return this;
                }

                else if (this.progressInt === 2) {
                    message.channel.send(`Enter Announcement Body <@${message.author.id}> : `).then(_type => this.messages.push(_type));
                    this.AnouncementTitle = message.content;
                    this.progressInt += 1;
                    return this;
                }

                else if (this.progressInt === 3) {

                    //WHAT THE?!
                    (async function (_msgs) {
                        for (_m of _msgs) {
                            await _m.delete();
                            await new Promise(r => setTimeout(r, 1000));
                        }
                    })(this.messages);

                    let pfpLink = ``;
                    var title = this.AnouncementTitle;
                    var body = message.content;
                    var annEmbed = makeEmbed(message, title, body, null, "#FF8000", pfpLink)
                    try {
                        this.progressInt = 0;
                        message.client.channels.cache.get(this.AnnouncementChannelID).send(annEmbed)
                        return;
                    }
                    catch (error) {
                        this.progressInt = 0;
                        message.channel.send(`Something Went Wrong! <@${message.author.id}>`);
                        message.client.channels.cache.get(BotMessagesChannelID).send(`Error: ${message.error}`);
                        return;
                    }

                }
            }
        }
    }
}