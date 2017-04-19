/* eslint no-unused-vars: ["error", { "args": "none" }] */


// SMOGLY STATIONS
const SMOGLY_STATIONS = require('../smoglyStations');


// Results Controller
module.exports = function (req, res, next) {

    res.status(200).type('json').send(SMOGLY_STATIONS);

};
