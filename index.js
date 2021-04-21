/**
 * Required External Modules
 */
const express = require('express');
const path = require("path");
// const main = require("main.js");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
// app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
// app.use('/', express.static(__dirname + 'public'));

/**
 * Routes Definitions
 */
// app.get("/", function(req, res){
// });
app.get("/submit-form", function(req, res){
    console.log("query");
    console.log(req.query);

    //call template function from another file
    
    // res.send(req.query + "<br><br> " + req.body);
    res.redirect('/result.html');
});

/**
 * Server Activation
 */
app.listen(port, function(){
    console.log("server is running");
});