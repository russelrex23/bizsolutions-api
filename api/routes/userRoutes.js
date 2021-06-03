'use strict';
module.exports = function(app) {
    const userHandlers = require('../controllers/userController.js');
    const sendEmail = require('../utils/sendEmail');
    const jwt = require('jsonwebtoken');
    // todoList Routes
    app.route('/auth/sign-up')
        .post(userHandlers.sign_up);
    app.route('/auth/sign-in')
        .post(userHandlers.sign_in);
    app.route('/user-update')
        .put(userHandlers.user_update);
};
