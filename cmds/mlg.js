//GET mlg
const prefix = require('../config.json').preifx;

module.exports = {
    name: 'mlg',
    description: `for the most legit gamer out there`,
    usage: `${prefix}mlg`,
    aliases: ['gaymer', 'most_legit_gamer'],
    isPublic: true,
    showInHelp: false,
    getCommand() {
        return {
            execute(message, args) {

                message.channel.send(`Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet Sentinels Momet `);

                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                var gifs = [
                    "https://tenor.com/view/wow-cat-thug-life-doritos-mountain-dew-gif-14737452",
                    "https://tenor.com/view/tenz-valorant-vct-sentinels-gif-21832393",
                    "https://tenor.com/view/cope-gif-21611779",
                    "https://tenor.com/view/shroud-pubg-sunglasses-streamer-shades-down-stare-gif-16556000",
                    "https://tenor.com/view/telletubies-mlg-rekt-swag-gif-5392325",
                    "https://tenor.com/view/deal-with-it-peppa-pig-gif-5582674",
                    "https://tenor.com/view/kda-brimstone-valorant-dancing-gif-19786288",
                    "https://tenor.com/view/mlg-shoot-dance-gif-12516972"
                ];

                var randint = getRandomInt(0, gifs.length);

                if (!gifs[randint]) randint = 2;

                message.reply(gifs[randint]);
            }
        }
    }
}