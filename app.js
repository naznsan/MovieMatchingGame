var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

var makeCardsArray = function(input, numberOfPosters) {
    var cardsArray = [];
    var counter = 0;
    while(cardsArray.length < numberOfPosters * 2) {
        let movieCurr = {};
        movieCurr.name = input["results"][counter]["title"];
        movieCurr.src = input["results"][counter]["poster_path"];
        if (movieCurr.src != null) {
            cardsArray.push(movieCurr);
            cardsArray.push(movieCurr);
        }
        counter++;
    }
    console.log(cardsArray);
    return cardsArray;
}

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
            var data = JSON.parse(body);
            if (data["results"].length < numberOfPosters) {
                var errorCode = 1;
                res.render("error", {errorCode: errorCode});
            } else {
                var cardsArray = makeCardsArray(data, numberOfPosters);
                res.render("play", {cardsArray: cardsArray});
            }            
        }
    });
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("Server up and running");
});