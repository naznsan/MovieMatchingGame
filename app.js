var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/movie", function(req, res) {
    var url = "https://api.themoviedb.org/3/search/movie?api_key=089218f328b033d3d4da0471c1f40665&language=en-US&query=rings&page=1&include_adult=false";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.send(body);
        }
    })
})



app.listen(3001, function() {
    console.log("Server up and running");
});