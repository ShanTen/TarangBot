module.exports = function AppendData(reg){
    var saveData = require('./save.json');
    //console.log(`Red Data From Participants: ${JSON.stringify(saveData)}`); //Debug
    class Participant{ //lmao
        Name;
        Events=[];
    }    
    try{
        var tParticipants = require('./participants.json'); //Of [DiscordID] of [prop] = val

        let eventsRegistered = reg.EventsRegistered;
        for(eventReg of eventsRegistered){
            if (eventReg.Name && eventReg.Participants != []) {
                for(p of eventReg.Participants){
                        //Assuming each Participant to be a unique one
                        if(!tParticipants[p.DiscordId]){
                        tParticipants[p.DiscordId] = new Participant();
                        tParticipants[p.DiscordId].Name = p.Name
                        tParticipants[p.DiscordId].Events.push(eventReg.Name)
                        // console.log(`Save Data in loop ${JSON.stringify(saveData)}`); //Debug
                        saveData["participants"] += 1;
                        console.log(saveData["participants"]);
                    }
                    else{
                        tParticipants[p.DiscordId].Events.push(eventReg.Name);
                    }
                }
            }
        }
        let pData = JSON.stringify(tParticipants);
        console.log(`Part formatter save...${JSON.stringify(saveData)}`);
        require('fs').writeFileSync('./save.json',JSON.stringify(saveData));
        return ['REG',pData];
    }
    catch(err){
        console.log(err.message);
        return ['ERR',err.message];
    }
}