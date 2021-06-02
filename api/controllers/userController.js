'use strict';

const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');

exports.register = function(req, res) {
    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
};

exports.sign_in = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        // if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
    });
};
