//GET HEADPAT
const prefix = require('../config.json').preifx;

module.exports = {
    name: 'headpat',
    description: `Emotional Support with a chance of rejection.`,
    usage: `${prefix}headpat`,
    aliases: ['patpat', 'hp'],
    isPublic: true,
    showInHelp: false,
    getCommand() {
        return {
            execute(message, args) {
                message.react('😁');
                message.channel.send(`Here you go UwU`);

                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                var headpats = [
                    "https://tenor.com/view/kaede-azusagawa-kaede-gif-head-headpat-gif-13284057",
                    "https://tenor.com/view/big-hero6-baymax-there-there-patting-head-pat-head-gif-4086973",
                    "https://tenor.com/view/good-boy-pat-on-head-stitch-gif-14742401",
                    "https://tenor.com/view/kaede-azusagawa-kaede-gif-head-headpat-gif-13284057",
                    "https://tenor.com/view/nerd-final-fantasy-vii-ffvii-frog-dance-gif-16104435",
                    "https://tenor.com/view/mala-mishra-jha-pat-head-cute-sparkle-penguin-gif-16770818",
                    "https://tenor.com/view/pepe-the-frog-head-pat-good-frog-very-good-gif-17840177",
                    "https://tenor.com/view/patpat-pat-comfort-patonthehead-therethere-gif-10534102",
                    "https://tenor.com/view/joey-friends-pheobe-pat-on-head-gif-14068732",
                    "https://tenor.com/view/no-bugs-bunny-nope-gif-14359850"
                ];

                var randint = getRandomInt(0,headpats.length);

                if(!headpats[randint]) randint = 2;

                message.reply(headpats[randint]);
            }
        }
    }
}