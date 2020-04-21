var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.send("Welcome");
});



app.listen(3000, function() {
    console.log("Server up and running");
});