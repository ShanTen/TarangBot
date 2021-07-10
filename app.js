const r = "./RequestParser";
const f = "./formatParticipants";
const m = "./makeRequestsGetRawData";

const statsFileLocation = `./stats.json`;

const got_registra = "Got Registration!";
const error_t = "Tried to parse registration, but failed either due to invalid or some other error.";

function req(a) {return require(a);}


                        const fs=require("fs"),fsPr=require("fs")
                     .promises,Discord=require("discord.js"),client
                    =new Discord.Client,cfg=require("./config.json"),
                  prefix=cfg.preifx,statusList=cfg.statusList,serverCfg
                  =require("./serverConfig.json"),organsrRole=serverCfg
                  .Role_Organiser,parse_sklReg=require(r),prse_participa
                 =require(f),        gSheets=require      (m),evls=Object
                 .keys(/**/            serverCfg.            Events); var
                 arguments=           process.argv          ,executingCmds
                 ={};cfg/**/        .startTime=new Date    ,client.login(cfg
                 .token),client.cmds=new Discord.Collection;const comdFiles
                 =fs.readdirSync("./cmds").filter(e=>e.endsWith(".js"));for
                 (const command of comdFiles){var t=req(`./cmds/${command}`)
                     ;client.cmds.set            (t.name,t)}var pstat
                         ="true";                   arguments[2]
                         
          &&["true","false"].includes(arguments[2].toLowerCase())&&(pstat=arguments[2]),
          "true"==pstat&&setInterval(function(){var e=new Date,t=`${`${e.getFullYear()
          }-${e.getMonth()+1}-${e.getDate()}`} ${`${e.getHours()}:${e.getMinutes()}:${
                e.getSeconds()}`}`;console.log(`Polled at ${t}`),gSheets().then
                  (e=>{if(e&&null!=e){console.log(got_registra);let t///////
                    =parse_sklReg(e.values[0],evls),s=prse_participa(t)//
                     ;if("REG"==s[0]){let e=s[1];return void    fs/////
                      .writeFileSync("./participants.json",e)//www///
                      }return"ERR"==s[0]?(console.log(error_t)//w
                       ,void console.log(s[1])):void 0}}).catch//
                       (e=>console.log(e.message))},1e4);var i=0;
                       client.on("ready",function(){console.log
                         ("Ready and running."),setInterval
                           (function() {client.user.////
                           setActivity(statusList[i]//
                           [0],{type: statusList[i]//
                            [1]}), i++,i%=statusList
                            .length}, 18e4)});//Done

                         
//############################### Handle Roles ##################################

const someJSONobj = require(`./participants.json`);
client.on('guildMemberAdd', (member) => {
	console.log("Got New Join!");
	let user = `${member.user.username}#${member.user.discriminator}`;
	console.log(`${user} Joined the server!`); //LOGIT
	if (!someJSONobj[user]) { //bruh 
		return;
	}
	var rolesToassign = someJSONobj[user].Events;
	for (var roleName of rolesToassign) {
		let roleID = serverCfg.Events[roleName].RoleID;
		member.roles.add(roleID);

		let channelID = serverCfg.Events[roleName].ChannelID;
		client.channels.cache.get(channelID).send(`Welcome to ${roleName}  ${someJSONobj[user].Name}!`);
	}
});

//############################### Command Handler ###############################

client.on('message', message => {

	if (executingCmds[message.author.id]) {
		executingCmds[message.author.id] = executingCmds[message.author.id].execute(message, null, config, null, Discord);
		return;
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.cmds.get(commandName) || client.cmds.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	var commandInstance = command.getCommand();

	if (!message.member.roles.cache.has(organsrRole) && !command.isPublic && command.isPublic != undefined) {
		return;
	}

	if (command.args && !args.length) //this doenst work?
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    
    try 
    {
		if ([21, 4, 292, 69, 420, 11, 33].includes(Math.floor((Math.random() * 1000) + 1))) {
			return message.channel.send('no.');
		}

		var db = null; //There's no db? never has been 🔪🔪🔪	
		var stats = require(statsFileLocation);
		var incrementCommands = Object.keys(stats);

		executingCmds[message.author.id] = commandInstance.execute(message, args, cfg, db, Discord); //adding disc instance maybe bad idea

		//lmao
		if (incrementCommands.includes(command.name)) {
			(async function (sfloc) {
				stats[command.name] += 1;
				var data = JSON.stringify(stats)
				await fsPr.writeFile(sfloc, data)
			})(statsFileLocation);
		}
	}
	catch (error) {
		console.error(error);
		console.log(commandName);
		message.reply('Yikes. There was an error trying to execute that command!');
	}
});