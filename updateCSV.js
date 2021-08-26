
/**
 * Required External Modules
 */
const util = require('util')
const fs = require('fs');
const {google} = require('googleapis'); 


// custom modules
const utility = require('./utility.js');

// const fs_writeFile = util.promisify(fs.writeFile);

function updateCSV(req, res, type="") {
    if (type == "google") {
        // update by google sheet
        readGoogleSheets()
        .then((rows)=>{
            console.log("then");
            console.log("typeof ", typeof rows);
            const json = convertSheetsRowsToJson(rows);
            const result = writeSheetsToDataSrc(res, json);
            // res.send(json);
        })
        .catch(function (err) {
            console.log('Error: ', err);
        });
        // console.log("range, majorDimension, values", a.range, a.majorDimension, a.values);
        
    }
    else {
        // update by upload csv file

        const csvFile = req.files.csvFile;

        // console.log("csvFile", csvFile);
        // console.log("-------");

        const json = convertCSVToJson(csvFile[0]);
        const result = utility.overwriteJsonFile("datasrc/detail.json", json);
        console.log("result", result);
        if (result === true){
            // end point response function
            updateConfigFileDate(res);
        }
        // return true;
        res.send({"status": "success"});
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
        const callback = function(err) {
            res.send({"status": "success", "data": currDatetime});
        };
        utility.overwriteFileContent(jsonPath, inputString, callback);
    }
}



/**
 * // tutorial: https://www.youtube.com/watch?v=PFJNJQCU_lo
   // official doc: https://github.com/googleapis/google-api-nodejs-client/tree/master/samples
   api ac: same as this ac
 */
async function readGoogleSheets(){
    console.log("readGoogleSheets()");

    try{
        const auth = new google.auth.GoogleAuth({
            keyFile : "datasrc/credentials.json",
            scopes  : "https://www.googleapis.com/auth/spreadsheets"
        });

        // create client instance for auth
        const client = await auth.getClient();

        // instance of google sheet api
        const googleSheets = google.sheets({
            version: "v4", 
            auth: client,
        });

        // const spreedsheetId = "1PZLapleGQtagcaPnxmfLSJkeGYPm0H495vYSBWmypPg";
        const spreedsheetId = "1Mlpy2pQBlvETPIXapYPv5ehVNdA4FJCk1JwsvwsPBIo";

        // get metadata aboiut spreadsheet
        const metaData = await googleSheets.spreadsheets.get({
            auth: auth,
            spreadsheetId: spreedsheetId
        });

        // read rows from spreadsheet
        const getRows = await googleSheets.spreadsheets.values.get({
            auth: auth,
            spreadsheetId: spreedsheetId,
            range: "testing"// "工作表1"
        });

        // write row(s) to spreadsheet
        // await googleSheets.spreadsheets.values.append({
        //     auth: auth,
        //     spreadsheetId: spreedsheetId,
        //     range: "工作表1!A:B",
        //     valueInputOption : "RAW", // || "USER_ENTERED" --> try to parse input format
        //     resource : {
        //         values: [
        //             ["Make a tutorial", "testing"] //1 row
        //         ]
        //     }
        // });

        // console.log(getRows.data, getRows.data);
        return getRows.data;
    }
    catch (err) {
        console.log("catch", err);
    }
}


function convertSheetsRowsToJson(rows) {
    console.log("---");
    if (rows && rows.values) {
        const values = rows.values;
        const header = values.shift();

        let json = [];
        values.forEach( row => {
            let temp = {};
            for(let i=0; i<header.length; i++) {
                temp[header[i]] = row[i];
            }
            if (Object.keys(temp).length > 0) {
                json.push(temp);
            } 
        });
        console.log(json);
        return json;
    }
    return [];
}

function writeSheetsToDataSrc (res, jsonAry){
    console.log("writeSheetsToDataSrc");

    if (jsonAry && jsonAry.length > 0) {
        const jsonPath = "datasrc/detail.json";
        const inputString = JSON.stringify(jsonAry, null, 4);
        const callback = function(err) {
            res.send({"status": "success"});
        };
        utility.overwriteFileContent(jsonPath, inputString, callback);
    }
    console.log("Empty json array", jsonAry);
}


// eport module
module.exports = updateCSV;