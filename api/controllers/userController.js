'use strict';

const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User'),
    sendEmail = require('../utils/sendEmail');

exports.sign_up = function(req, res) {
    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            try {
                const { email, site } = req.body;
                const token = {token: jwt.sign({ email: user.email, _id: user._id }, 'RESTFULAPIs') };
                sendEmail(email, site, token);
                res.json({message: "Email successfully sent!", token: token.token});
            }
            catch(err) {
                res.status(500).json({message: err});
            }
        }
    });
};

exports.sign_in = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: user.email, _id: user._id }, 'RESTFULAPIs') });
    });
};

exports.user_update = function(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);

    const doc = User.findOneAndUpdate({email: req.body.email}, {$set:{password: password, firstName:req.body.firstName, lastName: req.body.lastName}}, {new: true}, (err, doc) => {
        if (err) {
            res.json({message: err});
        }

        res.json({message: "Account Successfully Updated"});
    });
};
