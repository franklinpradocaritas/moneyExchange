'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "secret_key_money_exchange";

exports.ensureAuth = function (req, res, next) {
    
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: "Authentication header is missing"
        });
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    var payload = null;

    try {
        payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: "Token has expired"
            });
        }
    } catch (error) {
        return res.status(404).send({
            message: "Token is not valid"
        });
    }

    req.user = payload;
    next();
};