'use strict';


// CHAI SETUP
const chai = require('chai');
const expect = chai.expect;


// NODE MODULES
const app = require('express')();


// APP HELPERS
const routesInjector = require('../../helpers/routesInjector');


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODElS
let routeModel;


// APP ROUTES
const routes = [];


describe('Helpers:', () => {

    describe('routesInjector.js', () => {
        beforeEach(() => {
            routeModel = mongoose.models.Route ? mongoose.model('Route') : mongoose.model('Route', require('../../models/route').schema);

            // Success
            routes.push(new routeModel({
                url: '/nowa-trasa0'
            }));
            routes.push(new routeModel({
                url: '/nowa-trasa1'
            }));

            // Incorrect
            routes.push(new routeModel({
                url: '/nowa-trasa0',
                method: 'wrong' // <--- This method not supported by app
            }));

            // Failure
            routes.push(new routeModel({
                url: '/nowa-trasa0',
                controller: 'wrong' // <--- This controller not exist
            }));
        });

        afterEach(() => {
            routes.length = 0;
        });

        it('is a function', () => {

            expect(routesInjector).to.be.a('function');

        });

        it('without any arguments should return false', () => {

            expect(routesInjector()).to.be.false;

        });

        it('injection of correct data should return an object with property success <array> which contains newly added routes to application', () => {

            expect(routesInjector(app, routes).success.length).to.equal(2);

        });

        it('injection of incorrect data should return an object with property incorrect <array> which contains incorrect routes', () => {

            expect(routesInjector(app, routes).incorrect.length).to.equal(1);

        });

        it('injection of data causing error should return an object with property failure <array> which contains routes with errors', () => {

            expect(routesInjector(app, routes).failure.length).to.equal(1);

        });

        it('without required object property or argument appObj should return false', () => {
            expect(routesInjector({
                appObj: null,
                routesArr: routes
            })).to.be.false;

            expect(routesInjector(null, routes)).to.be.false;
        });

        it('without required object property or argument routesArr should return false', () => {
            expect(routesInjector({
                appObj: app,
                routesArr: null
            })).to.be.false;

            expect(routesInjector(app, null)).to.be.false;
        });
    });

});
