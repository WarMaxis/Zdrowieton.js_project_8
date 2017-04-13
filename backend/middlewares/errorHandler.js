/* eslint no-unused-vars: ["error", { "args": "none" }] */


// Normal Error Handler
function normalErrorHandler(err, req, res, next) {

    res.send(err.message);

}


// Angular Error Handler
function angularErrorHandler(err, req, res, next) {

    res.send(err.message);

}


// API Error Handler
function apiErrorHandler(err, req, res, next) {

    res.send(err.message);

}


module.exports = {
    normal: normalErrorHandler,
    angular: angularErrorHandler,
    api: apiErrorHandler
};
