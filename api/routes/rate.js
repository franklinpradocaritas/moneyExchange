'use strict'

var express = require("express");
var RateController = require("../controllers/rate");

var api = express.Router();
var md_auth = require("../middlewares/authenticate");

api.post('/rate', md_auth.ensureAuth, RateController.saveRate);
api.put('/rate', md_auth.ensureAuth, RateController.updateRate);
api.get('/rate', md_auth.ensureAuth, RateController.getRate);
api.get('/rate/list', md_auth.ensureAuth, RateController.getAll);

module.exports = api;