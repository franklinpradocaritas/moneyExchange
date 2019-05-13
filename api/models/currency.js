'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CurrencySchema = Schema({
    code: String,
    name: String
});

module.exports = mongoose.model("Currency", CurrencySchema);