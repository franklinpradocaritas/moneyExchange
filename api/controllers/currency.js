'use strict'

var Currency = require("../models/currency");
var Rate = require("../models/rate");

function saveCurrency(req, res) {
    var params = req.body;
    var currency = new Currency();

    if (params.code && params.name) {
        currency.code = params.code;
        currency.name = params.name;

        Currency.find({
            code: currency.code
        }).exec((err, currencies) => {
            if (err) return res.status(500).send({
                message: "Request error"
            });

            if (currencies && currencies.length >= 1) {
                return res.status(200).send({
                    message: "Currency already exist. Verify that code is valid."
                });
            } else {
                currency.save((err, currencyStored) => {
                    if (err) return res.status(500).send({
                        message: "Error saving Currency"
                    });

                    if (currencyStored) {
                        res.status(200).send({
                            currency: currencyStored
                        });
                    } else {
                        res.status(404).send({
                            message: "Currency was not saved"
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

function updateCurrency(req, res) {
    var params = req.body;
    var currency = new Currency();

    if (params._id && params.sell) {
        currency._id = params._id
        currency.code = params.code;
        currency.name = params.name;

        Currency.findByIdAndUpdate(currency._id, currency, {
            new: true
        }, (err, currencyUpdated) => {
            if (err) return res.status(500).send({
                message: "Request error"
            });

            if (!currencyUpdated) return res.status(404).send({
                message: "Currency not updated"
            });

            return res.status(200).send({
                currency: currencyUpdated
            });
        });
    } else {
        res.status(200).send({
            message: "Send all required fields"
        });
    }
}

function convertCurrency(req, res) {
    var params = req.query;

    if (params.from && params.to && params.amount) {

        Rate.findOne({
            from: params.from,
            to: params.to
        }, (err, rate) => {
            if (err)
                return res.status(500).send({
                    message: "Request fail"
                });

            if (rate) {
                return res.status(200).send({
                    totalBuy: rate.buy * params.amount,
                    totalSell: rate.sell * params.amount
                });
            } else {
                return res.status(404).send({
                    message: "Rate not found"
                });
            }
        });
    } else {

        res.status(200).send({
            message: "Send all required fields"
        });
    }
}

function getCurrency(req, res) {
    var params = req.query;
    var currencyId = params.id;    

    if (currencyId) {

        Currency.findOne({
            _id: currencyId
        }, (err, currency) => {
            if (err)
                return res.status(500).send({
                    message: "Request fail"
                });

            if (currency) {
                return res.status(200).send({
                    currency
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

function getBaseCurrencies(req, res) {
    var params = req.query;

    Rate.find({})
        .distinct("from")
        .exec((err, baseCurrencies) => {
            if (err)
                return res.status(500).send({
                    message: "Request fail"
                });

            if (baseCurrencies) {
                Currency.find({
                        _id: {
                            $in: baseCurrencies
                        }
                    })
                    .sort({
                        "name": 1
                    })
                    .exec((err, currencies) => {
                        return res.status(200).send({
                            currencies
                        });
                    });
            } else {
                return res.status(404).send({
                    message: "Empty currency base list"
                });
            }
        });
}

function getRelativeCurrencies(req, res) {
    var params = req.query;

    if (params.id) {
        Rate.find({
                from: params.id
            })
            .distinct("to")
            .exec((err, relativeCurrencies) => {
                if (err)
                    return res.status(500).send({
                        message: "Request fail"
                    });

                if (relativeCurrencies) {
                    Currency.find({
                            _id: {
                                $in: relativeCurrencies
                            }
                        })
                        .sort({
                            "name": 1
                        })
                        .exec((err, currencies) => {
                            return res.status(200).send({
                                currencies
                            });
                        });
                } else {
                    return res.status(404).send({
                        message: "Empty currency base list"
                    });
                }
            });
    } else {

        res.status(200).send({
            message: "Send all required fields"
        });
    }
}

function getAllCurrencies(req, res) {

    Currency.find({})
        .sort({
            "name": 1
        })
        .exec((err, currencies) => {
            if (err)
                return res.status(500).send({
                    message: "Request fail"
                });

            if (currencies) {
                return res.status(200).send({
                    currencies
                });
            } else {
                return res.status(404).send({
                    message: "Empty currency list"
                });
            }
        });
}

module.exports = {
    saveCurrency,
    updateCurrency,
    convertCurrency,
    getCurrency,
    getBaseCurrencies,
    getRelativeCurrencies,
    getAllCurrencies
};