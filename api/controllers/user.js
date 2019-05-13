'use strict'

var bcrypt = require("bcrypt-nodejs");
var User = require("../models/user");
var jwt = require("../services/jwt");

function home(req, res) {
    res.status(200).send({
        message: "Home"
    });
}

function test(req, res) {
    res.status(200).send({
        message: "Test completed"
    });
}

function saveUser(req, res) {
    var params = req.body;
    var user = new User();

    if (params.name && params.surname && params.nickname && params.email && params.password) {
        user.name = params.name;
        user.surname = params.surname;
        user.nickname = params.nickname;
        user.email = params.email;

        User.find({
            $or: [{
                    email: user.email.toLowerCase()
                },
                {
                    nickname: user.nickname.toLowerCase()
                }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({
                message: "Request error"
            });

            if (users && users.length >= 1) {
                return res.status(200).send({
                    message: "User already exist. Verify that email or nickname are valid."
                });
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({
                            message: "Error saving user"
                        });

                        if (userStored) {
                            res.status(200).send({
                                user: userStored
                            });
                        } else {
                            res.status(404).send({
                                message: "User was not saved"
                            });
                        }
                    });
                });
            }
        });



    } else {
        res.status(200).send({
            message: "Send all required fields"
        });
    }
}

function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({
        email: email
    }, (err, user) => {
        if (err)
            return res.status(500).send({
                message: "Request fail"
            });

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } else {
                        user.password = undefined;
                        return res.status(200).send({
                            user
                        });
                    }
                } else {
                    return res.status(404).send({
                        message: "User not identified"
                    });
                }
            });
        } else {
            return res.status(404).send({
                message: "User not found"
            });
        }
    });
}

module.exports = {
    home,
    test,
    saveUser,
    loginUser
};