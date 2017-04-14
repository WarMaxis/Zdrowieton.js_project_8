// Helpers - Function: routesInjector( { appObj: APP OBJECT, routesArr: [{}, {}] } ) or arguments in the same order as object properties.
module.exports = function (appObj, routesArr, ...args) {
    const injectionStats = {
        incorrect: [],
        success: [],
        failure: []
    };

    if (arguments.length === 0) {
        return false;
    }

    if (arguments.length === 1 && typeof appObj === 'object') {
        args = appObj;

        appObj = args.appObj;
        routesArr = args.routesArr;
    }

    if (typeof appObj !== 'function' || routesArr instanceof Array === false) {
        return false;
    }

    routesArr.forEach((elem) => {
        if (typeof appObj[elem.method] === 'function' && typeof elem.url === 'string' && typeof elem.getController === 'function') {
            try {
                appObj[elem.method](elem.url.split(','), elem.getController());

                injectionStats.success.push(elem);
            } catch (e) {
                injectionStats.failure.push(elem);
            }
        } else {
            injectionStats.incorrect.push(elem);
        }
    });

    return injectionStats;
};
