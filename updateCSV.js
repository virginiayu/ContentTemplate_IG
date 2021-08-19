const fs = require('fs');


function updateCSV(req) {
    const csvFile = req.files.csvFile;
    const csvPath = req.body.csvPath;

    // console.log("csvFile", csvFile);
    // console.log("csvPath", csvPath);
    // console.log("-------");

    if (csvPath) {
        const result = readCSVByPath(csvPath);
        return result;
    }
    else if (csvFile) {
        const json = convertCSVToJson(csvFile);
        return overwriteJsonFile(json);
    }
    return null;

}

function convertCSVToJson(csvFile){
    // the buffer here containes your file data in a byte array 
    const csvBuffStr = csvFile.buffer.toString('utf8');
    // console.log("typof csvBuffStr", typeof csvBuffStr);
    // console.log(csvBuffStr);
    // console.log("-------");
    
    const rows = csvBuffStr.split('\r');
    let header = rows.shift();
    header = header.split(',');
    console.log(header);
    let jsonArray = [];
    for (let row of rows) {
        // const columns = row.replace(/"/g, '').split(',');
        const columns = row.split(',');
        // console.log(columns);
        let json = {};
        columns.forEach(function(col, ind) {
            json[header[ind]] = col.replace(/"/g, '');
        });
        jsonArray.push(json);
    }
    console.log(jsonArray);
    return jsonArray;
}

function overwriteJsonFile(json){
    if (json) {
        const str = JSON.stringify(json, null, 4); // 4 == num. of space for readability purposes
        fs.writeFile("datasrc/detail.json", str, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            return true;
        }); 
    }
    return false;
}

function readCSVByPath(csvPath){

}

// eport module
module.exports = updateCSV;