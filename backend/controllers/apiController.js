/* eslint no-unused-vars: ["error", { "args": "none" }] */


// APP CONFIG
const APP_CONFIG = require('../app.config');


// Api Controller
module.exports = function (req, res, next) {

    // Sends a JSON with application configuration
    res.status(200).type('json').send(APP_CONFIG);

};
