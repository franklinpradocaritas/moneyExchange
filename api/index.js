'use strict'

var mongoose = require("mongoose");
var app = require("./app");
var port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/money_exchange",{ useNewUrlParser:true})
    .then(()=> {
        console.log("MongoDB is Connected.");

        // Creating Server
        app.listen(port,()=> {
            console.log("Server is running on http://localhost:3800");
        });
    })
    .catch(err => {
        console.log(err);
    });