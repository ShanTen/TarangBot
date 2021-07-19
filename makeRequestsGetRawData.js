	const readJSON = require('./helpScripts/readJSON');
	
	module.exports = async function makeRequestsReturnRawData(){
	

	var saveData = readJSON('./save.json'); //var


	const axios = require('axios');
	const config = require('./gsheetsConfig.json');
	var sheetId = config.gSheetID;
	var sheetName = config.gSheetName;
	var key = config.gApiKey;
	var url = function () {
		//checks next line automagically in time interval
		t_registrationsCount = saveData.registrationsCount + 1;
		return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'${sheetName}'!A${2 + t_registrationsCount}:BW${2 + t_registrationsCount}?key=${key}`;
	};

	const getReq = async (url) => {
		try {
			return await axios.get(url);
		} catch (error) {
			console.error(error);
		}
	}
	try{
		var data = (await getReq(url())).data;
		if(data.values){
			saveData.registrationsCount += 1; //save to _save_ file 
			require('fs').writeFileSync('./save.json',JSON.stringify(saveData));
			return data;
		}else{
			return null
		}
	}
	catch(err){
		console.error(err.message);
	}
}


//Debug / Unused
// console.log(`Req Parser save: ${JSON.stringify(saveData)}`); //DEBUG
// console.log(`Got New Registration!`) //#log it
// var registrationsCount = 0; //set from file