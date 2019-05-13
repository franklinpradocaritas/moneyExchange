'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    nickname: String,
    email: String,
    password: String,
    role: String,
    creationDate: String,
    modificationDate: String
});

module.exports = mongoose.model("User", UserSchema);