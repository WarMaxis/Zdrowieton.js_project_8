/* eslint no-console: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */


'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const helpers = require('../helpers/helpers');


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
let routeModel,
    route;


describe('Models:', () => {

    describe('route.js', () => {
        before((done) => {

            mongoose.connect(`mongodb://${helpers.MONGO_DB.USER}:${helpers.MONGO_DB.PASSDOWRD}@${helpers.MONGO_DB.HOST}:${helpers.MONGO_DB.PORT}/${helpers.MONGO_DB.NAME}`, helpers.MONGO_DB.OPTIONS, (err) => {
                if (err) {
                    console.log(err.message);
                }

                done();
            });

        });

        beforeEach((done) => {
            routeModel = mongoose.models.Route ? mongoose.model('Route') : mongoose.model('Route', require('../../models/route').schema);

            route = new routeModel(helpers.ROUTE_MODEL.EXAMPLE_DATA);

            route.save((err, route) => {
                if (err) {
                    console.log('1.', err.message);
                }

                done();
            });
        });

        afterEach((done) => {

            routeModel.collection.drop().then(() => {
                done();
            });

        });

        after((done) => {

            mongoose.connection.close().then(() => {
                done();
            });

        });

        it('is a function', (done) => {
            expect(routeModel).to.be.a('function');

            done();
        });

        it('method find should return an array with one object', (done) => {

            routeModel.find(helpers.ROUTE_MODEL.EXAMPLE_DATA, (err, results) => {
                if (results.length !== 1) {
                    throw Error('Something went wrong!');
                }

                done();
            });

        });

        it('method save on object with the same property url should return an error', (done) => {
            const routeU = new routeModel({
                url: '/test'
            });

            routeU.save((err, route) => {
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('route model constructor without required object property url should return an error', (done) => {
            routeModel.create({}, (err, route) => {
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('new route object created only with required object property url should return correct object', () => {
            const routeEqual = {
                url: route.url,
                method: route.method,
                controller: route.controller
            };

            expect(routeEqual).to.deep.equal(helpers.ROUTE_MODEL.EQUAL_ROUTE);
        });

        it('new route object created with all random object properties should return correct object', () => {
            route = new routeModel(helpers.ROUTE_MODEL.RANDOM_EQUAL_ROUTE);
            const routeEqual = {
                url: route.url,
                method: route.method,
                controller: route.controller
            };

            expect(routeEqual).to.deep.equal(helpers.ROUTE_MODEL.RANDOM_EQUAL_ROUTE);
        });

        it('method getController should return exported module function', () => {
            expect(route.getController()).to.be.a('function');
        });
    });

});
