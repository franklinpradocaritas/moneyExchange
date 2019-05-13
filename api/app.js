'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

//Load API Paths

var user_routes = require("./routes/user");
var currency_routes = require("./routes/currency");
var rate_routes = require("./routes/rate");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors

// Paths
app.use('/api',user_routes);
app.use('/api',currency_routes);
app.use('/api',rate_routes);


//Export
module.exports = app;