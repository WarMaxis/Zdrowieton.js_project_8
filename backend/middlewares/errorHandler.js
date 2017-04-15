/* eslint no-unused-vars: ["error", { "args": "none" }] */


// APP CONFIG
const APP_CONFIG = require('../app.config');


// APP SERVICES
const alertHandler = require('../services/alertHandler');
const reqProtocol = require('../services/reqProtocol');


// USEFUL FUNCTIONS
function errorToJson(err) {
    alertHandler('error', err);

    return {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode ? err.statusCode : APP_CONFIG.HTTP_CODE.SUPPORTED_ERRORS[0]
    };
}


// Normal Error Handler
function normalErrorHandler(err, req, res, next) {
    const supportedErrors = APP_CONFIG.HTTP_CODE.SUPPORTED_ERRORS;

    const errorCode = supportedErrors.includes(err.statusCode) ? err.statusCode : supportedErrors[0];

    const redirectParams = {
        statusCode: 302,
        url: `${reqProtocol(req)}://${process.env.NODE_ENV === 'production' ? req.hostname : req.headers.host}${APP_CONFIG[errorCode].URL}`
    };


    alertHandler('error', err);


    return res.redirect(redirectParams.statusCode, redirectParams.url);
}


// Angular Error Handler
function angularErrorHandler(err, req, res, next) {
    const params = errorToJson(err);

    return res.status(params.statusCode).type('json').send(params);
}


// API Error Handler
function apiErrorHandler(err, req, res, next) {
    const params = errorToJson(err);

    return res.status(params.statusCode).type('json').send(params);
}


module.exports = {
    normal: normalErrorHandler,
    angular: angularErrorHandler,
    api: apiErrorHandler
};
