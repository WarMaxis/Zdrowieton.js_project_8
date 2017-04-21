/* eslint no-unused-vars: ["error", { "args": "none" }] */


// LOCAL VARIABLES
const config = {
    find: {},
    selected: [],
    limit: 5,
    sort: {
        'last_metering.created': -1
    }
};


// APP SERVICES
const mongoose = require('../services/mongoose');


// SMOGLY MODELS
const resultModelName = 'Result';
const resultModel = mongoose.models[resultModelName] ? mongoose.model(resultModelName) : mongoose.model(resultModelName, require('../smoglyDataCollector/models/result').schema);


// USEFUL FUNCTIONS
function toObject(string) {
    const object = {};
    const array = toArray(string);

    if (!array) {
        return false;
    }

    array.forEach((elem) => {
        if (/^[a-z0-9_.]{1,50}:{1}[a-ząćęłńóśźż0-9 -_.]{1,50}$/i.test(elem)) {
            let arr = elem.split(/:(.+)/);

            object[arr[0]] = arr[1];
        }
    });

    return Object.keys(object).length !== 0 ? object : false;
}

function toArray(string) {
    const array = string ? string.split(',') : [];

    if (array.length === 0) {
        return false;
    }

    return array;
}

function toInt(string) {
    const int = parseInt(string);

    if (!isNaN(int)) {
        return int;
    }

    return false;
}


// Results Controller
module.exports = function (req, res, next) {
    const q = req.query;
    const find = toObject(q.find) || config.find;
    const selected = toArray(q.select) || config.selected;
    const limit = toInt(q.limit) || config.limit;
    const sort = toObject(q.sort) || config.sort;

    // Searches for matched results in database
    resultModel.find(find, selected, {
        limit: limit,
        sort: sort
    }, (err, data) => {
        if (err) {
            next(err);
        } else {
            res.status(200).type('json').send(data);
        }
    });
};
