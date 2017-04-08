// APP CONFIG
const APP_CONFIG = require('../app.config.js');


module.exports = class Route {
    constructor(url, method, controller, ...args) {
        if (arguments.length === 0) {
            throw Error(`Specify an arguments <url[string], method[string:default ${APP_CONFIG.ROUTE.DEFAULT_METHOD}], controller[string:default ${APP_CONFIG.ROUTE.DEFAULT_CONTROLLER}]> or an object properties {url: <string>, method: <string:default ${APP_CONFIG.ROUTE.DEFAULT_METHOD}>, controller: <string:default ${APP_CONFIG.ROUTE.DEFAULT_CONTROLLER}>}.`);
        }

        if (arguments.length === 1 && typeof arguments[0] === 'object') {
            args = arguments[0];

            if (!args.url || (args.method && !APP_CONFIG.ROUTE.METHODS.includes(args.method))) {
                throw Error(`Error: Bad arguments ${JSON.stringify(arguments)}. Specify required object properties: {url: <string>, method: <string:supports ${APP_CONFIG.ROUTE.METHODS}}.`);
            }
        } else {
            if (!url || (method && !APP_CONFIG.ROUTE.METHODS.includes(method))) {
                throw Error(`Error: Bad arguments ${JSON.stringify(arguments)}. Specify required argument: <url[string], method[string:supports ${APP_CONFIG.ROUTE.METHODS}]>.`);
            }
        }

        this.url = args.url || url;
        this.method = args.method || method || APP_CONFIG.ROUTE.DEFAULT_METHOD;
        this.controller = args.controller || controller || require(`../controllers/${APP_CONFIG.ROUTE.DEFAULT_CONTROLLER}`);
    }
};
