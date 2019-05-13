'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RateSchema = Schema({
    from: {
        type: Schema.ObjectId,
        ref: "Currency"
    },
    to: {
        type: Schema.ObjectId,
        ref: "Currency"
    },
    sell: Number,
    buy: Number
});

module.exports = mongoose.model("Rate", RateSchema);