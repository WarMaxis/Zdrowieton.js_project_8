/* eslint no-unused-vars: ["error", { "args": "none" }] */


// APP CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;
const PAGES_CONFIG = require('../app.config').PAGES_CONFIG;


// APP SERVICES
const reqProtocol = require('../services/reqProtocol');
const alertHandler = require('../services/alertHandler');


// USEFUL FUNCTIONS
function errorToJson(err) {
    return {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode ? err.statusCode : HTTP_CODES_CONFIG.SUPPORTED_ERRORS[0]
    };
}


// Normal Error Handler
function normalErrorHandler(err, req, res, next) {
    const errorCode = HTTP_CODES_CONFIG.SUPPORTED_ERRORS.includes(err.statusCode) ? err.statusCode : HTTP_CODES_CONFIG.SUPPORTED_ERRORS[0];
    const langValue = PAGES_CONFIG.LANGUAGES.includes(req.params.lang) ? req.params.lang : PAGES_CONFIG.LANGUAGES[0];

    alertHandler('error', errorToJson(err));

    res.redirect(HTTP_CODES_CONFIG.REDIRECT.TEMPORARY, `${reqProtocol(req)}://${process.env.NODE_ENV === 'production' ? req.hostname : req.headers.host}/${langValue}${PAGES_CONFIG[errorCode].URL}`);
}


// Angular Error Handler
function angularErrorHandler(err, req, res, next) {
    const params = errorToJson(err);

    alertHandler('error', params);

    res.status(params.statusCode).type('json').send(params);
}


// API Error Handler
function apiErrorHandler(err, req, res, next) {
    const params = errorToJson(err);

    alertHandler('error', params);

    res.status(params.statusCode).type('json').send(params);
}


module.exports = {
    normal: normalErrorHandler,
    angular: angularErrorHandler,
    api: apiErrorHandler
};
