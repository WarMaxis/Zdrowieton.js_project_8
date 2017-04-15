/* eslint no-unused-vars: ["error", { "args": "none" }] */


// NODE MODULES
const Promise = require('bluebird');


//USEFUL FUNCTIONS
const promiseReflect = (promise) => {
    return promise.then((data) => {
        return {
            data: data,
            status: 'success'
        };
    }, (err) => {
        return {
            err: err,
            status: 'failure'
        };
    });
};


// Helpers - Function: dataInjector( { model: <Mongoose model> , array: <Array of objects> } ) or arguments in the same order as object properties.
module.exports = function (model, array, ...args) {

    return new Promise((resolve, reject) => {
        const asyncArray = [];
        const injectionStats = {
            success: [],
            failure: []
        };

        if (arguments.length === 0) {
            reject(false);
        }

        if (arguments.length === 1 && typeof model === 'object') {
            args = model;

            model = args.model;
            array = args.array;
        }

        if (typeof model !== 'function' || typeof model.create !== 'function' || array instanceof Array === false) {
            reject(false);
        }

        array.forEach((elem) => {
            asyncArray.push(new model(elem).save());
        });

        new Promise.all(asyncArray.map(promiseReflect)).then((data) => {
            injectionStats.success = data.filter(f => f.status === 'success');
            injectionStats.failure = data.filter(f => f.status === 'failure');

            resolve(injectionStats);
        }).catch((err) => {
            reject(err);
        });
    });

};
