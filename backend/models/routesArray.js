module.exports = class RoutesArray {
    constructor(routeInstance) {
        if (arguments.length === 0) {
            throw Error('Specify an arguments <routeInstance[function]>.');
        }

        this.routeInstance = routeInstance;
        this.routesArray = [];
        this.alreadyTakenUrls = [];
    }
    addRoute(route) {
        if (route instanceof this.routeInstance && route.url && !this.alreadyTakenUrls.includes(route.url)) {
            this.routesArray.push(route);
            this.alreadyTakenUrls.push(route.url);
        } else {
            throw Error('Route object is not an instance of right function or have specified already taken url.');
        }
    }
};
