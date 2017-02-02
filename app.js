var express = require("express");
var app = express();
var path = require('path');
var morgan = require("morgan");
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var cors = require("cors");
var http = require('http');
var bodyParser = require ("body-parser");
var cookieParser = require('cookie-parser');

// var webpack = require("webpack");

var routes = require("./config/routes");

// *** config file *** //
var config = require('./_config');

var environment = app.get("env");

var port = process.env.PORT || 3000;
var databaseUri = require("./config/db")(environment);

mongoose.Promise = bluebird
mongoose.connect(databaseUri);

if("test" !== environment) {
  app.use(morgan("dev"));
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));

app.use("/api", routes);

var server = app.listen(port, function() {
  console.log("Node running on port 3000, Cap'n.");
});

module.exports = app;

