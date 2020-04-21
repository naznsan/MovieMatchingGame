var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/play", function(req, res) {
    var query = req.query.search;
    var difficulty = req.query.difficulty;
    let numberOfPosters = 0;

    switch (difficulty) {
        case "easy":
            numberOfPosters = 3;
            break;
        case "medium":
            numberOfPosters = 6;
            break;
        case "hard":
            numberOfPosters = 12;
            break;
    }

    console.log({query, difficulty});
    var url = `https://api.themoviedb.org/3/search/movie?api_key=089218f328b033d3d4da0471c1f40665&query=${query}`;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Data received from API");
            var data = JSON.parse(body);
            var movieArray = data["results"].slice(0, numberOfPosters);
            res.render("play", {movieArray: movieArray});

        }
    });
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