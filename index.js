/**
 * Required External Modules
 */
const express = require('express');
const path = require("path");
const ejs = require('ejs');
const engine = require('ejs-locals');
const fs = require('fs')
const multer = require('multer');
const csv2json = require("csvtojson");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const upload = multer();

const dataHandling = require('./dataHandling');
const updateCSV = require('./updateCSV.js');

/**
 *  App Configuration
 */
app.engine('ejs', engine);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));



/**
 * Routes Definitions
 */
app.get("/", function(req, res) {
    res.render('index');
});

/** for index.html */
// for non-design form submission
app.post("/submit_normal_form", function(req, res) {
    let query = req.body; // req.query;
    
    // data process
    let result = dataHandling(query, 'normal');
    
    res.json(result);
});

app.post("/submit_design_form", function(req, res) {
    let query = req.body; // req.query;
    
    // data process
    let result = dataHandling(query, 'design');
    
    res.json(result);
});



/** for uploadcsv.html */
app.get("/get_csv_date", (req, res) => {
    const config = fs.readFileSync('datasrc/config.json', 'utf-8');
    const temp = JSON.parse(config);
    res.send(temp["csv_import_data"]);
});

app.post("/submit_csv", upload.single('csvFile'), (req, res) => {
    try {
        const csvFile = req.file.buffer.toString();
        const rows = csvFile.split('\n');

        for (let row of rows) {
            const columns = row.replace(/"/g, '').split(',');
            console.log(columns);
        }


        // // Convert a csv file with csvtojson
        // csv2json()
        // .fromFile(csvFilePath)
        // .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
        //     console.log(jsonArrayObj); 
        // })

        // // Parse large csv with stream / pipe (low mem consumption)
        // csv2json()
        // .fromStream(readableStream)
        // .subscribe(function(jsonObj){ //single json object will be emitted for each csv line
        //     // parse each json asynchronousely
        //     return new Promise(function(resolve,reject){
        //         asyncStoreToDb(json,function(){resolve()})
        //     })
        // }) 

        // //Use async / await
        // const jsonArray=await csv2json().fromFile(filePath);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});


/**
 * Server Activation
 */
app.listen(port, function() {
    console.log("server is running");
});
