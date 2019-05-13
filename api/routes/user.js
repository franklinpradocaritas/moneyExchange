'use strict'

var express = require("express");
var UserController = require("../controllers/user");

var api = express.Router();
var md_auth = require("../middlewares/authenticate");

api.get('/test', md_auth.ensureAuth, UserController.test);
api.get('/home', UserController.home);
// api.post('/user', md_auth.ensureAuth ,UserController.saveUser);
api.post('/user', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports = api;