const fs = require('fs');
module.exports = function(fileLoc){
    return JSON.parse(fs.readFileSync(fileLoc));
}