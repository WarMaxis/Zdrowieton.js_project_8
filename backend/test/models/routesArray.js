'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;


// LOCAL MODULES
const RoutesArray = require('../../models/routesArray');
const Route = require('../../models/route');


describe('Models:', () => {

    describe('routesArray.js', () => {

        it('is a function', () => {

            expect(RoutesArray).to.be.a('function');

        });

        it('constructor name is RoutesArray', () => {

            expect(new RoutesArray(() => {}).constructor.name).to.equal('RoutesArray');

        });

        it('constructor without any arguments should throw an error', () => {
            let error;

            try {
                new RoutesArray();
            } catch (e) {
                error = e;
            }

            if (!error) {
                throw Error('RouteArray constructor does not pass test.');
            }
        });

        it('constructor with Route function argument should return a new object with properties routeInstance, routesArray and alreadyTakenUrls', () => {
            const routesArray = new RoutesArray(Route);
            const obj = {
                routeInstance: Route,
                routesArray: [],
                alreadyTakenUrls: []
            };

            expect(routesArray).to.deep.equal(obj);
        });

        it('object method addRoute() without any arguments should throw an error', () => {
            const routesArray = new RoutesArray(Route);

            let error;

            try {
                routesArray.addRoute();
            } catch (e) {
                error = e;
            }

            if (!error) {
                throw Error('RouteArray.addRoute() method do not pass test.');
            }
        });

        it('object method addRoute({}) with an empty object argument should throw an error', () => {
            const routesArray = new RoutesArray(Route);

            let error;

            try {
                routesArray.addRoute({});
            } catch (e) {
                error = e;
            }

            if (!error) {
                throw Error('RouteArray.addRoute() method do not pass test.');
            }
        });

        it('object method addRoute(route) with passed new Route object argument should add a new element to an array', () => {
            const routesArray = new RoutesArray(Route);
            const route = new Route('/test');

            routesArray.addRoute(route);

            expect(routesArray.routesArray[0] === route).to.be.true;
        });

        it('in case adds objects with the same proprty url should throw an error', () => {
            const routesArray = new RoutesArray(Route);
            const route = new Route('/test');

            let error;

            try {
                routesArray.addRoute(route);
                routesArray.addRoute(route);
            } catch (e) {
                error = e;
            }

            if (!error) {
                throw Error('RouteArray.addRoute() method do not pass test.');
            }
        });

    });

});
