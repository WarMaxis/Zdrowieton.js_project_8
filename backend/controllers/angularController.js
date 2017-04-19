/* eslint no-unused-vars: ["error", { "args": "none" }] */


// APP CONFIG
const APP_CONFIG = require('../app.config');
const HTTP_CODES_CONFIG = APP_CONFIG.HTTP_CODES_CONFIG;
const PAGES_CONFIG = APP_CONFIG.PAGES_CONFIG;


// APP SERVICES
const reqProtocol = require('../services/reqProtocol');


// Angular Controller
module.exports = function (req, res, next) {
    const langValue = PAGES_CONFIG.LANGUAGES.includes(req.params.lang) ? req.params.lang : PAGES_CONFIG.LANGUAGES[0];

    // Redirects to page main address
    if (/^\/{3}.*$/.test(req.url)) {
        return res.redirect(HTTP_CODES_CONFIG.REDIRECT.PERMANENT, `${reqProtocol(req)}://${process.env.NODE_ENV === 'production' ? req.hostname : req.headers.host}/`);
    }

    // Sends the appropriate HTML file of angular application
    res.status(200).type('html').sendFile(`index-${langValue}.html`, {
        root: `${__dirname}/..${APP_CONFIG.DIRECTORY.STATIC_DIR}`,
        headers: PAGES_CONFIG.HEADERS
    }, (err) => {
        if (err) {
            next(err);
        }
    });
};
