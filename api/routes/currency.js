'use strict'

var express = require("express");
var CurrencyController = require("../controllers/currency");

var api = express.Router();
var md_auth = require("../middlewares/authenticate");

api.post('/currency', md_auth.ensureAuth, CurrencyController.saveCurrency);
api.put('/currency', md_auth.ensureAuth, CurrencyController.updateCurrency);
api.get('/currency', md_auth.ensureAuth, CurrencyController.getCurrency);
api.get('/currency/list', md_auth.ensureAuth, CurrencyController.getAllCurrencies);
api.get('/currency/baselist', md_auth.ensureAuth, CurrencyController.getBaseCurrencies);
api.get('/currency/relativelist', md_auth.ensureAuth, CurrencyController.getRelativeCurrencies);
api.get('/currency/convert', md_auth.ensureAuth, CurrencyController.convertCurrency);

module.exports = api;