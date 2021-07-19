const readJSON = require('./helpScripts/readJSON');

module.exports = function AppendData(reg){
	var saveData = readJSON('./save.json'); //var

    class Participant{ //lmao
        Name;
        Events=[];
    }    
    try{
        var tParticipants = readJSON('./participants.json'); //Of [DiscordID] of [prop] = val

        let eventsRegistered = reg.EventsRegistered;
        for(eventReg of eventsRegistered){
            if (eventReg.Name && eventReg.Participants != []) {
                for(p of eventReg.Participants){
                        //Assuming each Participant to be a unique one
                        if(!tParticipants[p.DiscordId]){
                        tParticipants[p.DiscordId] = new Participant();
                        tParticipants[p.DiscordId].Name = p.Name
                        tParticipants[p.DiscordId].Events.push(eventReg.Name)
                        saveData["participants"] += 1;
                    }
                    else{
                        tParticipants[p.DiscordId].Events.push(eventReg.Name);
                    }
                }
            }
        }
        let pData = JSON.stringify(tParticipants);

        require('fs').writeFileSync('./save.json',JSON.stringify(saveData));
        return ['REG',pData];
    }
    catch(err){
        console.log(err.message);
        return ['ERR',err.message];
    }
}

//Unused/Debug
// console.log(`Part formatter save...${JSON.stringify(saveData)}`);
// console.log(saveData["participants"]);
// console.log(`Save Data in loop ${JSON.stringify(saveData)}`); //Debug
//console.log(`Red Data From Participants: ${JSON.stringify(saveData)}`); //Debug
