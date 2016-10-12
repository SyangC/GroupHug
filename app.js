var express = require("express");
var app = express();
var morgan = require("morgan");
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var cors = require("cors");
var port = process.env.PORT || 3000;
var bodyParser = require ("body-parser");
var routes = require("./config/routes");
var environment = app.get("env");
var databaseUri = require("./config/db")(environment);

mongoose.Promise = bluebird
mongoose.connect(databaseUri);

if("test" !== environment) {
  app.use(morgan("dev"));
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", routes);

var server = app.listen(port, function() {
  console.log("It's aliiiiiiiiiive!!!");
});

module.exports = app;