/* eslint no-unused-vars: ["error", { "args": "none" }] */


// NODE MODULES
const request = require('request');


// APP CONFIG
const APP_CONFIG = require('../app.config');


// SMOGLY CONFIG
const SMOGLY_CONFIG = require('./smogly.config');


// SMOGLY STATIONS
const stations = require('./stations/stations');


// APP SERVICES
const mongoose = require('../services/mongoose');
const alertHandler = require('../services/alertHandler');


// SMOGLY MODELS
const resultModelName = 'Result';
const resultModel = mongoose.models[resultModelName] ? mongoose.model(resultModelName) : mongoose.model(resultModelName, require('./models/result').schema);


// USEFUL FUNCTIONS
function getStation(id) {
    for (let i in stations) {
        if (stations[i].id === id) {
            return stations[i];
        }
    }

    return false;
}


// Helpers - Function: smoglyDataCollector() - arguments are not required, settings are available in smogly.config.js.
function smoglyDataCollector() {
    const dataState = {
        page: SMOGLY_CONFIG.FIRST_PAGE - 1,
        status: false,
        results: 10,
        counter: 0
    };

    alertHandler('info', 'Smogly Data Collector running...');

    const dataInterval = setInterval(() => {
        if (dataState.results === 0 || (dataState.counter % dataState.results === 0)) {
            if (dataState.page === SMOGLY_CONFIG.LAST_PAGE) {
                alertHandler('success', `Smogly Data Collector successfully saved data from pages ${SMOGLY_CONFIG.FIRST_PAGE}-${SMOGLY_CONFIG.LAST_PAGE} to a database.`);

                mongoose.connection.close(() => {
                    process.exit(0);
                });

                clearInterval(dataInterval);
            } else {
                dataState.page++;
                dataState.status = false;
                dataState.counter = 0;
            }
        }

        if (!dataState.status) {
            dataState.status = true;

            request(`${SMOGLY_CONFIG.REQUEST_URL}?page=${dataState.page}`, (error, response, body) => {
                const results = body ? JSON.parse(body).results : [];

                dataState.results = results.length;

                results.forEach((elem) => {
                    let result = getStation(elem.station) || {};

                    if (result.name) {
                        result.last_metering = {
                            created: elem.created,
                            pm25: elem.pm25,
                            pm10: elem.pm10,
                            temp_out1: elem.temp_out1,
                            hum_out1: elem.hum_out1
                        };

                        result = new resultModel(result);

                        result.save((err, result) => {
                            dataState.counter++;
                        });
                    }
                });
            });
        }
    }, 100);
}


// MongoDB Connect ---> http://mongoosejs.com/docs/guide.html
mongoose.connect(`mongodb://${APP_CONFIG.MONGO_DB.USER}:${APP_CONFIG.MONGO_DB.PASSDOWRD}@${APP_CONFIG.MONGO_DB.HOST}:${APP_CONFIG.MONGO_DB.PORT}/${APP_CONFIG.MONGO_DB.NAME}`, APP_CONFIG.MONGO_DB.OPTIONS, (err) => {
    if (err) {
        alertHandler('error', err);
    }
});


// Event on successfully connecting to database
mongoose.connection.on('connected', () => {

    // Runs Smogly Data Collector
    smoglyDataCollector();

});


// Event on CTRL+C keys pressing
process.on('SIGINT', () => {

    // Closes connection with MongoDB
    mongoose.connection.close(() => {
        process.exit(0);
    });

});
