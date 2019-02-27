var express = require('express');
var http = require('http');
var logger = require("morgan")
var path = require("path");
var bodyparser = require("body-parser");

// make express app.
var app = express();

// set views folder
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger('short'));
app.use(bodyparser.urlencoded({
    extended: false
}));

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/new-entry", function (req, res) {
    res.render("new-entry");
});

app.post("/new-entry", function (req, res) {
    if (!req.body.title || !req.body.body) {
        res.sendStatus(400);
        res.send("Entries must have a title and body.");
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });
    res.redirect("/");
});


app.use(function (req, res) {
    res.status(404).render("404");
});

http.createServer(app).listen(3000, function () {
    console.log("Gustbook app started on port 3000");
});