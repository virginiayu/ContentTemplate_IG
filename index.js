/**
 * Required External Modules
 */
const express = require('express');
const path = require("path");
const ejs = require('ejs');
const engine = require('ejs-locals');
const fs = require('fs');
const multer = require('multer');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const csvFilter = (req, file, cb) =>{
    if (file.mimetype == 'application/vnd.ms-excel' || file.originalname.include(".csv")){
        cb(null, true);
    }
    else {
        cb("Please upload only csv file", false);
    }
};
const upload = multer({fileFilter:csvFilter});

// custom function
const dataHandling = require('./dataHandling');
const updateCSV = require('./updateCSV.js');

/**
 *  App Configuration
 */
app.engine('ejs', engine);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());


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

const uploadFields = [
  { name: 'csvFile'},
  { name: 'csvPath'}
];
app.post("/submit_csv", upload.fields(uploadFields), (req, res) => {
    try {
        const result = updateCSV(req);        
        if (result) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
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
