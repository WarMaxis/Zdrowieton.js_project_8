/* eslint no-unused-vars: ["error", { "args": "none" }] */


// APP CONFIG
const APP_CONFIG = require('../app.config');
const HTTP_CODES_CONFIG = APP_CONFIG.HTTP_CODES_CONFIG;
const PAGES_CONFIG = APP_CONFIG.PAGES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');
const reqProtocol = require('../services/reqProtocol');


// APP MODELS
const pageModelName = 'Page';
const pageModel = mongoose.models[pageModelName] ? mongoose.model(pageModelName) : mongoose.model(pageModelName, require('../models/page').schema);


// USEFUL FUNCTIONS
function langToObj(lang) {
    return {
        value: PAGES_CONFIG.LANGUAGES.includes(lang) ? lang : PAGES_CONFIG.LANGUAGES[0],
        exist: lang ? true : false
    };
}

function pageToObj(page) {
    return {
        url: page ? `/${page}` : '/',
        exist: page ? true : false
    };
}

function getRedirectUrl(req, url) {
    return `${reqProtocol(req)}://${process.env.NODE_ENV === 'production' ? req.hostname : req.headers.host}${url}`;
}


// Normal Controller
module.exports = function (req, res, next) {
    const lang = langToObj(req.params.lang);
    const page = pageToObj(req.params.page);
    const searchedPage = {};

    // Main Page
    if (PAGES_CONFIG.MAIN_PAGE.IN_CASES.test(req.url)) {
        searchedPage.name = PAGES_CONFIG.MAIN_PAGE.NAME;
    } else {
        searchedPage.url = page.url;
    }

    // Redirect to Main Page
    if (PAGES_CONFIG.REDIRECT.IN_CASES.test(req.url)) {
        return res.redirect(HTTP_CODES_CONFIG.REDIRECT.PERMANENT, getRedirectUrl(req, `/${lang.value}${PAGES_CONFIG.MAIN_PAGE.URL}`));
    }

    // 404 Page
    if (!PAGES_CONFIG[404].NOT_IN_CASES.test(req.url)) {
        return res.redirect(HTTP_CODES_CONFIG.REDIRECT.PERMANENT, getRedirectUrl(req, `/${lang.value}${PAGES_CONFIG[404].URL}`));
    }

    // Searches for one matched page in database
    pageModel.find(searchedPage).limit(1).then((data) => {

        // 404 Page
        if (data.length === 0) {
            return res.redirect(HTTP_CODES_CONFIG.REDIRECT.PERMANENT, getRedirectUrl(req, `/${lang.value}${PAGES_CONFIG[404].URL}`));
        }

        const page = data[0];

        // Redirect Page
        if (page.type === 'redirect') {
            return res.redirect(page.redirect.statusCode, getRedirectUrl(req, `/${lang.value}${page.redirect.url}`));
        }

        // Sends the appropriate HTML file of found page
        res.status(page.statusCode).type('html').sendFile(page.fullFileName(lang.value), {
            root: `${__dirname}/..${page.root}`,
            headers: PAGES_CONFIG.HEADERS
        }, (err) => {
            if (err) {
                next(err);
            }
        });

    }).catch((err) => {
        next(err);
    });
};
