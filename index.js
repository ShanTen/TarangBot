const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const commandsLocation = 'cmds';

const config = require('./config.json');
const prefix = config.preifx;
const statusList = config.statusList;

const serverConfig = require('./serverConfig.json')
const organiserRole = serverConfig.Role_Organiser;
const parse_sklReg = require('./RequestParser');
const parse_Participants = require('./formatParticipants');
const GetSheets = require('./makeRequestsGetRawData');
const EventList = require('./serverConfig.json').EventList;

var executingCommands = {}
config.startTime = new Date();
client.login(config.token);
client.commands = new Discord.Collection();

// ############################### START UP ###############################

const commandFiles = fs
	.readdirSync(`./${commandsLocation}`) //Sync is fine because single time load that too during start up.
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./${commandsLocation}/${file}`);
	client.commands.set(command.name, command);
}

//############### Check if Sheets has been updated #####################

setInterval(function (){
	var today = new Date();
	var date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
	var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	var dateTime = `${date} ${time}`;

	console.log(`Polled at ${dateTime}`);

	GetSheets().then(
		unformated_data => {
			if(unformated_data && unformated_data != null){ 
				console.log('Got Registration!');
				
				 // console.log(unformated_data.values[0]); //DEBUG

				let formatedRegistration = parse_sklReg(unformated_data.values[0],EventList);
				let isValid = parse_Participants(formatedRegistration);
				if(isValid[0] == 'REG'){
					let parsedParticipants = isValid[1]; //already stringified
					fs.writeFileSync(`./participants.json`,parsedParticipants);
					return;
				}
				else if(isValid[0]=='ERR'){
					console.log(`Tried to parse registration, but failed either due to invalid or some other error.`)
					console.log(isValid[1])
					return;
				}
				else return;
			}
		}
	).catch(err => console.log(err.message));
}, 10000)

//############################### STATUS ###############################
var i = 0;
client.on('ready', function () {
	console.log('Ready and running.'); //#LOGIT
	setInterval(function () {
		client.user.setActivity(statusList[i][0], { type: statusList[i][1] });
		i++;
		i %= statusList.length;
	}, 180000)
})

//############################### Handle Roles ##################################

const someJSONobj = require(`./participants.json`); 
client.on('guildMemberAdd', (member) => {
	console.log("Got New Join!");
	let user = `${member.user.username}#${member.user.discriminator}`;
	console.log(`${user} Joined the server!`); //LOGIT
	var rolesToassign = someJSONobj[user].Events;
	for(var roleName of rolesToassign){
		let roleID = serverConfig.Events[roleName].RoleID;
		//Fix server config channel IDs
		// let channelID = serverConfig.Events[roleName].ChannelID;
		// console.log(member.client.channels.cache)
		// .get(channelID).send(`Welcome to ${roleName} ${someJSONobj[user].name}!`);
		// client.channels.cache.get(channelID).send(`Welcome to ${roleName} ${someJSONobj[user].name}!`);
		member.roles.add(roleID)
	}
	
});

//############################### Command Handler ###############################

client.on('message', message => {
	// console.log(executingCommands);

	if (executingCommands[message.author.id]) {
		executingCommands[message.author.id] = executingCommands[message.author.id].execute(message, null, config, null, Discord);
		return;
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// Config -> Load Role IF from config
	var commandInstance = command.getCommand();

	if (!message.member.roles.cache.has(organiserRole) && !command.isPublic && command.isPublic != undefined) {
		return;
	}

	if (command.args && !args.length)
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);

	try {
		var db = null; //SET DB 
		executingCommands[message.author.id] = commandInstance.execute(message, args, config, db, Discord); //adding disc instance maybe bad idea
	}

	catch (error) {
		console.error(error);
		console.log(commandName);
		message.reply('Yikes. There was an error trying to execute that command!');
	}

});