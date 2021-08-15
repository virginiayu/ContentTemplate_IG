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
const port = process.env.PORT || "8000";

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
// for non-design form submission
app.post("/submit_normal_form", function(req, res) {
    let query = req.body; // req.query;
    console.log(query);
    console.log("-------");
    
    // data process
    let temp = dataHandling(query);
    console.log('after data dataHandling:', temp);
    console.log("-------");


    let html = "";
    if (Object.keys(temp).length > 0) {
        // bind template
        const templatePath = path.join(__dirname, 'views/template_normal.ejs');
        // return promise object
        // html = ejs.renderFile(templatePath, temp);

        // return plain text
        var template = fs.readFileSync(templatePath, 'utf-8');
        html = ejs.render(template, temp);
    }
    console.log(html);

    console.log("########");

    res.json({"data": html});
});

// // for design form submission
// app.post("/submit_form_design", function(req, res) {
//     var data = req.body;
//     res.send(data);
// });

/**
 * Server Activation
 */
app.listen(port, function() {
    console.log("server is running");
});
