'use strict';

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,


    User = require('../api/models/userModel'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require("jsonwebtoken");

const cors = require('cors');
const mongoose = require('mongoose');
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const dbConfig = require("../api/config/db.config.js");

mongoose.connect(dbConfig.url, option).then(function(){
    //connected successfully
    console.log('connected');
}, function(err) {
    console.log(err);
    //err handle
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

const routes = require('../api/routes/userRoutes');
routes(app);

// app.use(function(req, res) {
//     res.status(404).send({ url: req.originalUrl + ' not found' })
// });

app.use(cors());

app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;
