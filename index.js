/**
 * Required External Modules
 */
const express = require('express');
const path = require("path");
const ejs = require('ejs');
const engine = require('ejs-locals');
const fs = require('fs')

const dataHandling = require('./dataHandling');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "3000";

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
    // res.render('index');
});
// for non-design form submission
app.post("/submit_form_non_design", function(req, res) {
    var query = req.body; // req.query;

    // data process
    let temp = dataHandling(query);
    console.log('after data dataHandling:', temp);
    console.log("-------");

    // bind template
    const templatePath = path.join(__dirname, 'views/template_normal.ejs');
    // return promise object
    // let html = ejs.renderFile(templatePath, temp);
    // console.log(html);
    // console.log("-------");

    // return plain text
    var template = fs.readFileSync(templatePath, 'utf-8');
    let html2 = ejs.render(template, temp);
    console.log(html2);

    // res.json({"data": html2});
    res.send(html2);
    // res.redirect('.');
});

// for design form submission
app.post("/submit_form_design", function(req, res) {
    var data = req.body;
    res.send(data);
});

/**
 * Server Activation
 */
app.listen(port, function() {
    console.log("server is running");
});
