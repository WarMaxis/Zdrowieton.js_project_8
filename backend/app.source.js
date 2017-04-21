/* eslint no-console: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */


'use strict';


// RESTFULL API - NODEJS & EXPRESSJS - SOURCE


// NODE MODULES
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');


// APP CONFIG
const APP_CONFIG = require('./app.config.js');


// APP HELPERS
const dataInjector = require('./helpers/dataInjector');
const routesInjector = require('./helpers/routesInjector');


// APP MIDDLEWARES
const errorHandler = require('./middlewares/errorHandler')[APP_CONFIG.MODE];


// APP SERVICES
const mongoose = require('./services/mongoose');
const reqProtocol = require('./services/reqProtocol');
const alertHandler = require('./services/alertHandler');


// APP MODELS
const routeModelName = `${APP_CONFIG.MODE}Route`;
const routeModel = mongoose.models[routeModelName] ? mongoose.model(routeModelName) : mongoose.model(routeModelName, require('./models/route').schema);
const pageModelName = 'Page';
const pageModel = mongoose.models[pageModelName] ? mongoose.model(pageModelName) : mongoose.model(pageModelName, require('./models/page').schema);


//APP PAGES
const pages = require('./pages/pages');


// APP ROUTES
const routes = require('./routes/routes')[APP_CONFIG.MODE];



// MongoDB Connect ---> http://mongoosejs.com/docs/guide.html
mongoose.connect(`mongodb://${APP_CONFIG.MONGO_DB.USER}:${APP_CONFIG.MONGO_DB.PASSDOWRD}@${APP_CONFIG.MONGO_DB.HOST}:${APP_CONFIG.MONGO_DB.PORT}/${APP_CONFIG.MONGO_DB.NAME}`, APP_CONFIG.MONGO_DB.OPTIONS, (err) => {
    if (err) {
        alertHandler('error', err);
    }
});


// ExpressAPP Init ---> https://expressjs.com/en/4x/api.html
const app = express();


// Sets variables host, port and environment in app object
app.set('host', process.env.NODE_IP || APP_CONFIG.HOST);
app.set('port', process.env.NODE_PORT || APP_CONFIG.PORT);
app.set('env', process.env.NODE_ENV || APP_CONFIG.ENV);


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
        return reqProtocol(req) === 'https' ? next() : res.redirect(APP_CONFIG.HTTP_CODE.REDIRECT, 'https://' + req.hostname + req.url);
    });

}


// Serves static files from the directory, which is defined in the app.config.js file
app.use('/', express.static(`${__dirname}${APP_CONFIG.DIRECTORY.STATIC_DIR}`, {
    maxAge: 604800000
}));


////////////////////////////////////
//                                //
//          *** OPEN ***          //
//  * HERE ADD ALL YOUR ROUTES *  //
//                                //
////////////////////////////////////


/*****

1. First way not recommended: Example route code below.


app[METHOD:get,post,put,delete...]('/ROUTE_EXAMPLE', MIDDLEWARE(req, res, next), FUNCTION(req, res, next) => {

    res.send('Your message!');

});


2. Second way recommended: Go into directory ./routes then in file routes.js defines your route objects for any mode.

*****/


////////////////////////////////////
//                                //
//  * HERE ADD ALL YOUR ROUTES *  //
//         *** CLOSE ***          //
//                                //
////////////////////////////////////


// Event on successfully connecting to database
mongoose.connection.on('connected', () => {

    // Injects static objects of routes to database
    dataInjector(routeModel, routes).then((data) => {
        const sortBy = {
            url: -1
        };

        // Searching for all routes in database
        routeModel.find().sort(sortBy).then((data) => {

            // Depends on currently selected mode adds routes to app object
            const incorrectInjectedRoutes = routesInjector(app, data).incorrect;

            if (incorrectInjectedRoutes.length !== 0) {
                alertHandler('warning', `<Database> Incorrect injected routes: ${JSON.stringify(incorrectInjectedRoutes)}`);
            }

            // Handles HTTP errors
            app.use(errorHandler);

        }).catch((err) => {
            alertHandler('error', err);
        });

    }).catch((err) => {
        alertHandler('error', err);
    });

    // Injects static objects of pages to database
    dataInjector(pageModel, pages).catch((err) => {
        alertHandler('error', err);
    });

});


// Event on CTRL+C keys pressing
process.on('SIGINT', () => {

    // Closes connection with MongoDB
    mongoose.connection.close(() => {
        process.exit(0);
    });

});


module.exports = {
    appSource: (port, host) => {
        const createServer = app.listen(port, host);

        createServer.on('close', () => {
            mongoose.connection.close();
        });

        return createServer;
    },
    appInit: () => {
        app.listen(app.get('port'), app.get('host'), () => {

            console.log('\x1b[34m%s\x1b[0m', '[Restful API]', `Listening on address: http://${app.get('host')}:${app.get('port')}`);

        });
    }
};
