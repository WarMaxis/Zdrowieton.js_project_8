/* eslint no-console: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */


'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const helpers = require('./helpers');


// APP_CONFIG
const APP_CONFIG = require('../../app.config');


// APP HELPERS
const dataInjector = require('../../helpers/dataInjector');


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
let routeModel;


// APP ROUTES
const routes = require('../../routes/routes')[APP_CONFIG.MODE];


describe('Helpers:', () => {

    describe('dataInjector.js', () => {
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

            dataInjector(routeModel, routes).then((results) => {
                done();
            }).catch((err) => {
                console.log(err);

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
            expect(dataInjector).to.be.a('function');

            done();
        });

        it('without any arguments should return false', (done) => {
            dataInjector().catch((err) => {
                expect(err).to.be.false;

                done();
            });
        });

        it('injection of the same data should return an object with property failure <array> which contains duplicate elements in database', (done) => {
            dataInjector(routeModel, routes).then((results) => {
                expect(results.failure.length).to.equal(routes.length);

                done();
            });
        });

        it('injection of new data should return an object with property success <array> which contain newly added elements to database', (done) => {
            const data = [
                {
                    url: '/nowa-trasa0'
                }, {
                    url: '/nowa-trasa1'
                }
            ];

            dataInjector(routeModel, data).then((results) => {
                expect(results.success.length).to.equal(data.length);

                done();
            });
        });

        it('without required object property or argument model should return false', (done) => {
            dataInjector({
                model: null,
                array: routes
            }).catch((err) => {
                expect(err).to.be.false;

                dataInjector(null, routes).catch((err) => {
                    expect(err).to.be.false;

                    done();
                });
            });
        });

        it('without required object property or argument array should return false', (done) => {
            dataInjector({
                model: routeModel,
                array: null
            }).catch((err) => {
                expect(err).to.be.false;

                dataInjector(routeModel, null).catch((err) => {
                    expect(err).to.be.false;

                    done();
                });
            });
        });
    });

});
