'use strict'

var Rate = require("../models/rate");

function saveRate(req, res) {
    var params = req.body;
    var rate = new Rate();

    if (params.from && params.to && params.sell) {
        rate.from = params.from;
        rate.to = params.to;
        rate.sell = params.sell;
        rate.buy = params.buy;

        Rate.find({
            from: rate.from,
            to: rate.to
        }).exec((err, rates) => {
            if (err) return res.status(500).send({
                message: "Request error"
            });

            if (rates && rates.length >= 1) {
                return res.status(200).send({
                    message: "Rate already exist"
                });
            } else {
                rate.save((err, rateStored) => {
                    if (err) return res.status(500).send({
                        message: "Error saving Rate"
                    });

                    if (rateStored) {
                        res.status(200).send({
                            rate: rateStored
                        });
                    } else {
                        res.status(404).send({
                            message: "Rate was not saved"
                        });
                    }
                });
            }
        });
    } else {
        res.status(200).send({
            message: "Send all required fields"
        });
    }
}

function updateRate(req, res) {
    var params = req.body;
    var rate = new Rate();

    if (params._id && params.sell) {
        rate._id = params._id;
        rate.sell = params.sell;
        rate.buy = params.buy;

        delete rate.from;
        delete rate.to;
        Rate.findByIdAndUpdate(rate._id, rate, {
            new: true
        }, (err, rateUpdated) => {
            if (err) return res.status(500).send({
                message: " Request error"
            });

            if (!rateUpdated) return res.status(404).send({
                message: "Rate not updated"
            });

            return res.status(200).send({
                rate: rateUpdated
            });
        });
    } else {
        res.status(200).send({
            message: "Send all required fields"
        });
    }
}

function getAll(req, res) {
   
    Rate.find({})
        .populate("from")
        .populate("to")
        .sort({"from.code": 1})
        .exec((err, rates) => {
            if (err) return res.status(500).send({
                message: " Request error"
            });

            if (!rates) return res.status(404).send({
                message: "Rates not found"
            });

            return res.status(200).send({
                rates
            });
        });
}

function getRate(req, res) {
    var params = req.query;
    var rateId = params.id;    

    if (rateId) {

        Rate.findOne({
                _id: rateId
            })
            .populate("from")
            .populate("to")
            .exec((err, rate) => {
                if (err)
                    return res.status(500).send({
                        message: "Request fail"
                    });

                if (rate) {
                    return res.status(200).send({
                        rate
                    });
                } else {
                    return res.status(404).send({
                        message: "Currency not found"
                    });
                }
            });
    } else {
        res.status(200).send({
            message: "Send all required fields"
        });
    }
}

module.exports = {
    saveRate,
    updateRate,
    getAll,
    getRate
};