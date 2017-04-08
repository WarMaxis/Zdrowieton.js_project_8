/* eslint no-console: 0 */


'use strict';


// RESTFULL API - NODEJS & EXPRESSJS


// NODE MODULES
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const chalk = require('chalk');
const mongoose = require('mongoose');
const request = require('request');


// APP MODULES
const routesInjector = require('./helpers/routesInjector');


// APP CONFIG
const APP_CONFIG = require('./app.config.js');


// USEFUL FUNCTIONS
// To display a console log message in five types: normal, success, info, warning and error
function alertHandler(args) {
    return;

    args = args || {};

    if (app.get('env') === 'production' && args.type !== 'error') {
        return;
    }

    let types = {
        normal: 'white',
        success: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'red'
    };

    args.type = args.type || 'info';
    args.title = args.title || args.type;
    args.message = args.message || 'Remember to specify necessary property type & message in a configuration object.';
    args.color = types[args.type];
    args.messageTemplate = `
**~~~~~~~~* ${args.title.toUpperCase()} LOG - OPEN *~~~~~~~~~**
${args.message}
**~~~~~~~~* ${args.title.toUpperCase()} LOG - CLOSE *~~~~~~~~**`;

    console.log(chalk[args.color](args.messageTemplate));

}


// To create full URL address as a value (string) or false (boolean)
function createFullUrl(lang, url) {

    return lang && url ? `/${lang}/${url}` : false;

}


// To create file full name as a value (string) or false (boolean)
function createFileFullName(name, lang) {

    return name && lang ? `${name}-${lang}.html` : false;

}


// To create redirect page as a value (object)
function createPageRedirect(args) {

    args = args || {};

    let self = {
        statusCode: args.statusCode || APP_CONFIG.HTTP_CODE.REDIRECT,
        redirect: {
            url: args.url || createFullUrl(args.lang || APP_CONFIG.LANGUAGES[0], getPage({
                param: 'name',
                value: args.name || APP_CONFIG[404].NAME
            }).url || getPage({
                param: 'name',
                value: APP_CONFIG.REDIRECT.NAME
            }).url)
        }
    };

    return self;

}


// To get request protocol as a value (string) or false (boolean)
function getProtocol(req) {

    if (!req) {
        return false;
    }

    let protocol = req.connection.encrypted ? 'https' : 'http';

    protocol = req.headers['x-forwarded-proto'] || protocol;

    return protocol.split(/\s*,\s*/)[0];

}


// To get supported language as a value (object)
function getLang(arg) {

    return {
        value: APP_CONFIG.LANGUAGES.includes(arg) ? arg : false,
        existed: arg ? true : false
    };

}


// To get existed page as a value (object)
function getPage(args) {

    args = args || {};

    if (!args.value) {
        return {
            existed: false
        };
    }

    let searchTypes = ['name', 'url'],
        searchParam = searchTypes.includes(args.param) ? args.param : 'name',
        searchValue = args.value,
        pages = APP_CONFIG.PAGES;

    for (let i in pages) {
        if (pages[i][searchParam] === searchValue) {
            pages[i].statusCode = pages[i].statusCode || APP_CONFIG.HTTP_CODE.SUCCESS;
            pages[i].root = pages[i].root || APP_CONFIG.DIRECTORY.PAGES_DIR;
            pages[i].redirect = pages[i].redirect || false;
            pages[i].existed = true;

            return pages[i];
        }
    }

    return {
        existed: true
    };

}


// To handle all possible routes, returns value (object) with properties of an appropriate page or a redirect page
function routeHandler(params) {

    params = params || {};

    let langObj = getLang(params.lang),
        pageObj = getPage({
            param: 'url',
            value: params.page
        });

    if (pageObj.name) {
        pageObj.fileFullName = createFileFullName(pageObj.fileName, langObj.value || APP_CONFIG.LANGUAGES[0]);
    }


    // In case of MODE: Angular
    if (APP_CONFIG.MODE === 'Angular') {
        if (!langObj.existed && !pageObj.existed && params[0] || params.url === '///') {
            return createPageRedirect({
                url: '/'
            });
        }

        return {
            statusCode: APP_CONFIG.HTTP_CODE.SUCCESS,
            fileFullName: createFileFullName('index', langObj.value || APP_CONFIG.LANGUAGES[0]),
            root: APP_CONFIG.DIRECTORY.STATIC_DIR
        };
    }


    // Redirects in these cases to Main Page
    if ((!pageObj.name && !pageObj.existed) && ((!langObj.value && !langObj.existed) || (langObj.value && !params[0]))) {
        return createPageRedirect({
            lang: langObj.value,
            name: APP_CONFIG.MAIN_PAGE.NAME
        });
    }


    // Redirects in these cases to 404 Page
    if ((!langObj.value && langObj.existed) || (!pageObj.name && pageObj.existed) || params[0]) {
        return createPageRedirect({
            lang: langObj.value
        });
    }


    // Redirects in these cases to Page, which is specified in pageObj
    if (pageObj.redirect) {
        return createPageRedirect({
            statusCode: pageObj.statusCode,
            lang: langObj.value,
            name: pageObj.redirect.name
        });
    }


    return pageObj;

}



//MongoDB Connect
mongoose.connect(APP_CONFIG.MONGO_URI);
mongoose.connection.on('error', function (err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});



// INIT EXPRESS APP ---> https://expressjs.com/en/4x/api.html
const app = new express();


// Sets variables host & port in app object
app.set('host', process.env.NODE_IP || 'localhost');
app.set('port', process.env.NODE_PORT || 4000);


// Enables all Cross-Origin Resource Sharing (CORS) requests, more info about CORS middleware ---> https://github.com/expressjs/cors#cors
app.use(cors());


// Parses incoming request bodies before your handler start, more info about BODY PARSER middleware ---> https://github.com/expressjs/body-parser#body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Compresses response bodies for all request, more info about COMPRESSION middleware ---> https://github.com/expressjs/compression#compression
app.use(compression({
    threshold: 0
}));


// Redirects all insecure requests to secure protocol HTTPS only in production environment
if (app.get('env') === 'production') {

    app.use((req, res, next) => {
        return getProtocol(req) === 'https' ? next() : res.redirect(APP_CONFIG.HTTP_CODE.REDIRECT, 'https://' + req.hostname + req.url);
    });

}


// Serves static files from the directory, which is defined in the app.config.js file
app.use('/', express.static(`${__dirname}${APP_CONFIG.DIRECTORY.STATIC_DIR}`));


////////////////////////////////////
//                                //
//          *** OPEN ***          //
//  * HERE ADD ALL YOUR ROUTES *  //
//                                //
////////////////////////////////////


// First way not recommended: Example route code below.
/* 

app[METHOD:get,post,put...]('/ROUTE_EXAMPLE', FUNCTION(req, res, next) => {

    res.send('Your message!');

});

*/

const pomiar = require('./models/pomiar');

app.get('/test', function (req, res, next) {

    //    let npomiar = new pomiar({
    //        name: "Poznań 2 Ogród Botaniczny",
    //        updated: "2017-04-08T06:20:23.023186Z",
    //        position: {
    //            coordinates: [
    //                16.87728889,
    //                52.42031944
    //            ]
    //        },
    //        city: "Nowy Tomyśl",
    //        district: "Kazmierz",
    //        lastMetering: {
    //            pm25: 22,
    //            pm01: 23,
    //            pm10: 56
    //        }
    //    });
    //
    //
    //    let npomiar2 = new pomiar({
    //        name: "Poznań 2",
    //        updated: "2017-05-08T06:20:23.023186Z",
    //        position: {
    //            coordinates: [
    //                15,
    //                50
    //            ]
    //        },
    //        city: "Nowy Tomyśl",
    //        district: "Kazmierz",
    //        lastMetering: {
    //            pm25: 2,
    //            pm01: 2,
    //            pm10: 5
    //        }
    //    });
    //
    //    npomiar2.save(function (err, pomiarN) {
    //        if (err) return console.error(err);
    //        console.log(pomiarN);
    //        res.type('json').send(pomiarN);
    //    });



});



// Second way recommended: Go into directory ./routes then in file routes.js defines your route objects.
// Adds routes to app object
const Route = require('./models/route');
const route = new Route('/test');

const routes = require('./routes/routes');

routes.forEach((elem) => {
    console.log(elem);
    routesInjector(app, new Route(elem));
});

//routesInjector(app, route);


////////////////////////////////////
//                                //
//  * HERE ADD ALL YOUR ROUTES *  //
//         *** CLOSE ***          //
//                                //
////////////////////////////////////


// Handles all possible routes
app.get(['/', '/:lang', '/:lang/*', '/:lang/:page', '/:lang/:page/*', '*'], (req, res, next) => {

    req.params.url = req.url;

    let options = routeHandler(req.params);


    if (options.redirect) {
        options.redirect.url = `${getProtocol(req)}://${app.get('env') === 'production' ? req.hostname : req.headers.host}${options.redirect.url}`;

        alertHandler({
            type: 'info',
            message: `Redirected: ${JSON.stringify(options)}`
        });

        return res.redirect(options.statusCode, options.redirect.url);
    }

    return res.status(options.statusCode).type('html').sendFile(options.fileFullName, {
        root: `${__dirname}${options.root}`
    }, (err) => {
        if (err) {
            next(err);
        } else {
            alertHandler({
                type: 'success',
                message: `Sent: ${JSON.stringify(options)}`
            });
        }
    });

});


// Handles HTTP errors
app.use((err, req, res, next) => {

    if (!err) {
        return next();
    }

    alertHandler({
        type: 'error',
        message: err
    });

    alertHandler({
        type: 'error',
        message: err.stack
    });


    // In case of MODE: Angular
    if (APP_CONFIG.MODE === 'Angular') {
        let statusCode = err.statusCode || 500;

        return res.status(statusCode).type('json').send({
            message: err.message,
            statusCode: statusCode
        });
    }


    let statusCode = APP_CONFIG.HTTP_CODE.SUPPORTED_ERRORS.includes(err.statusCode) ? err.statusCode : APP_CONFIG.HTTP_CODE.SUPPORTED_ERRORS[0],
        options = createPageRedirect({
            lang: req.params.lang,
            name: APP_CONFIG[statusCode].NAME
        });


    return res.redirect(options.statusCode, options.redirect.url);

});

function saveToDB(result) {
    console.log(result);

    const Pomiar = require('./models/pomiar');

    Pomiar.find({
        name: result.name,
        lastMetering: {
            created: result.last_metering.created
        }
    }, (err, pomiar) => {
        console.log(err);
        console.log(pomiar)

        //        if (pomiary.length === 0) {
        //            let pomiarNew = new pomiar({
        //                name: result.name,
        //                position: {
        //                    coordinates: result.position.coordinates
        //                },
        //                city: result.city,
        //                district: result.district,
        //                lastMetering: {
        //                    created: result.last_metering.created,
        //                    pm25: result.last_metering.pm25,
        //                    pm01: result.last_metering.pm01,
        //                    pm10: result.last_metering.pm10
        //                }
        //            });
        //
        //            pomiarNew.save((err, pomiarNew) => {
        //                if (err) {
        //                    return console.log(err);
        //                }
        //
        //                console.log(pomiarNew);
        //            });
        //        }
    });

};


// Runs the server
app.listen(app.get('port'), app.get('host'), () => {

    console.log(`${chalk.blue('[Restful API]')} Listening on address: http://${app.get('host')}:${app.get('port')}`);

    let counterTime = 0;
    const interval = setInterval(() => {
        counterTime += 1000;

        if (counterTime % 1000 * 15 === 0) {
            console.log(counterTime);

            request('http://app.smogly.pl/api/v1/station/', (error, response, body) => {
                let resultsArray = JSON.parse(body).results;

                resultsArray.forEach((elem) => {
                    saveToDB(elem);
                });
            });
        }
    }, 1000);

});
