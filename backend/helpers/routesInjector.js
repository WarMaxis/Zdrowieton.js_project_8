// LOCAL MODULES
const Route = require('../models/route');
const RoutesArray = require('../models/routesArray');


// Helpers - Function: routesInjector( { appObj: APP OBJECT, routeObj: {url: '/test', method: 'get', controller: 'mainController'} ||&& routesArr: [{}, {}] } ) or arguments in the same order as object properties
module.exports = function (appObj, routeObj, routesArr, ...args) {
    if (arguments.length === 0) {
        return false;
    }

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        args = arguments[0];

        appObj = args.appObj;
        routeObj = args.routeObj;
        routesArr = args.routesArr;
    }

    if (!appObj || typeof appObj !== 'function' || (routeObj instanceof Route == false && routesArr instanceof RoutesArray == false)) {
        return false;
    }

    routesArr = routesArr ? routesArr.routesArray : [];
    if (routeObj instanceof Route === true) {
        routesArr.unshift(routeObj);
    }

    routesArr.forEach((elem) => {
        appObj[elem.method](elem.url, elem.controller);
    });

    return true;
};
