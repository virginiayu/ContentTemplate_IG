/**
 * Required External Modules
 */
const express = require('express');
const path = require("path");
const engine = require('ejs-locals');

// const contentProcessor = require('./main');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.engine('ejs', engine);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */
app.get("/", function(req, res){
    res.render('index');
});
app.get("/submit-form", function(req, res){
    var query = req.query;
    console.log("query:", query);

    // bind template
    // print the result into textarea
    res.render('result', {"output": "123"});
    // res.redirect('result.html');
});

/**
 * Server Activation
 */
app.listen(port, function(){
    console.log("server is running");
});
