/* eslint no-unused-vars: ["error", { "args": "none" }] */


// SMOGLY STATIONS
const stations = require('../smoglyDataCollector/stations/stations');


// Stations Controller
module.exports = function (req, res, next) {

    res.status(200).type('json').send(stations);

};
