
/**
 * Required External Modules
 */
const util = require('util')
const fs = require('fs');

// custom modules
const utility = require('./utility.js');

const fs_writeFile = util.promisify(fs.writeFile);

function updateCSV(req, res, type="") {
    
    if (type == "byPath") {
        // update by google sheet
        
    }
    else {
        // update by upload csv file

        const csvFile = req.files.csvFile;
        // const csvPath = req.body.csvPath;

        // console.log("csvFile", csvFile);
        // console.log("csvPath", csvPath);
        // console.log("-------");

        // if (csvPath) {
        //     const result = readCSVByPath(csvPath);
        //     return result;
        // }
        // else if (csvFile) {
            const json = convertCSVToJson(csvFile[0]);
            const result = utility.overwriteJsonFile("datasrc/detail.json", json);
            console.log("result", result);
            if (result === true){
                // end point response function
                updateConfigFileDate(res);
            }
            // return true;
            res.send({"status": "success"});
        // }
    }

    return null;

}

function convertCSVToJson(csvFile){
    if(csvFile){
        // the buffer here containes your file data in a byte array 
        const csvBuffStr = csvFile.buffer.toString('utf8');
        console.log("typof csvBuffStr", typeof csvBuffStr);
        // console.log(csvBuffStr);
        console.log("-------");
        
        const rows = csvBuffStr.split('\r');
        let header = rows.shift();
        header = header.split(',');
        // console.log(header);
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
        // console.log(jsonArray);
        return jsonArray;
    }
    return null;
}

// update config file after overwrite successfully
function updateConfigFileDate(res){
    const currDatetime = (new Date()).toISOString('utf-8');
    const jsonPath = "datasrc/config.json";
    let json = utility.getJsonContent(jsonPath);
    console.log("exist json", json);

    if (json === null) {
        return false;
    } 
    else {
        json['csv_import_data'] = currDatetime;
        console.log("new json", json);
        const inputString = JSON.stringify(json, null, 4);

        fs.writeFile(jsonPath, inputString, 'utf8', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            res.send({"status": "success", "data": currDatetime});
        });
    }
}

function readCSVByPath(csvPath){

}

// eport module
module.exports = updateCSV;