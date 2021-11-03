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
// const upload = multer({fileFilter:csvFilter});
const upload = multer();

// custom function
const utility = require('./utility.js');
const dataHandling = require('./dataHandling.js');
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
// for frontend autocomplete
app.get("/crystaltypelist", function(req, res) {
    const temp = utility.getJsonContent('datasrc/namelist.json');
    res.send(temp);
});
// for non-design form submission
app.post("/submit_normal_form", function(req, res) {
    let query = req.body; // req.query;
    
    // data process
    let result = dataHandling(query, 'normal');
    
    res.json(result);
});
// for design form submission
app.post("/submit_design_form", function(req, res) {
    let query = req.body; // req.query;
    
    // data process
    let result = dataHandling(query, 'design');
    
    res.json(result);
});
// for wiki form submission
app.post("/submit_wiki_form", function(req, res) {
    let query = req.body; // req.query;
    
    // data process
    let result = dataHandling(query, 'wiki');
    
    res.json(result);
});


/** for uploadcsv.html */
app.get("/get_csv_date", (req, res) => {
   res.status(200).send(updateCSV(req, res, "date"));
});

const uploadFields = [
  { name: 'csvFile'},
  { name: 'csvPath'}
];
app.post("/submit_csv", upload.fields(uploadFields), (req, res) => {
    try {
        updateCSV(req, res);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

app.post("/googlesheet_function", (req, res) => {
    try {
        updateCSV(req, res, "google");
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
