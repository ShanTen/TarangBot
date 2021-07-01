const readFileSync = require('fs').readFileSync;
module.exports = function(_rulesTextFilePath){
    var helpText = readFileSync(_rulesTextFilePath,'utf-8') //Async not required because load during start up
    var splitArr = helpText.split('\n\r\n\r');
    var helpObj = {}
    
    for(_event of splitArr){
        let eventSplit = _event.split('\n');
        let eventName = eventSplit[1].trim();
        let eventDesc = eventSplit.slice(2,eventSplit.length);
        helpObj[eventName] = eventDesc;
    }
    
    return helpObj;
}