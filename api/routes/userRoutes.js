'use strict';
module.exports = function(app) {
    const userHandlers = require('../controllers/userController.js');
    // todoList Routes
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
};
