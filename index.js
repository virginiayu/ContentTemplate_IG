/**
 * Required External Modules
 */
const express = require('express');
const path = require("path");
const ejs = require('ejs');
const engine = require('ejs-locals');

const dataHandling = require('./main');

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
app.use( express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */
app.get("/", function(req, res){
    res.render('index');
});
app.get("/submit-form", function(req, res){
    var query = req.query;
    // console.log("query:", query);
    // bind template
    // var html = dataHandling(query);
    let temp = dataHandling(query);
    let html = ejs.renderFile(path.join(__dirname, 'views/template_normal.ejs'), temp, {} , function(err, str){
        // str => Rendered HTML string
        if (err) console.log(err, err);
        // print the result into textarea
        res.render('result', {"output": str});    
    });
});

/**
 * Server Activation
 */
app.listen(port, function(){
    console.log("server is running");
});
