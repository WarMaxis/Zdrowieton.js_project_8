/* eslint no-console: 0 */
/* eslint no-unused-vars: ["error", { "args": "none" }] */


'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const helpers = require('../helpers/helpers');


// APP SERVICES
const mongoose = require('../../../services/mongoose');


// APP MODELS
let resultModel,
    result;


describe('Models:', () => {

    describe('result.js', () => {
        before((done) => {

            mongoose.connect(`mongodb://${helpers.MONGO_DB.USER}:${helpers.MONGO_DB.PASSDOWRD}@${helpers.MONGO_DB.HOST}:${helpers.MONGO_DB.PORT}/${helpers.MONGO_DB.NAME}`, helpers.MONGO_DB.OPTIONS, (err) => {
                if (err) {
                    console.log(err.message);
                }

                done();
            });

        });

        beforeEach((done) => {
            resultModel = mongoose.models.Result ? mongoose.model('Result') : mongoose.model('Result', require('../../models/result').schema);

            result = new resultModel(helpers.RESULT_MODEL.EXAMPLE_DATA);

            result.save((err, result) => {
                if (err) {
                    console.log('1.', err.message);
                }

                done();
            });
        });

        afterEach((done) => {

            resultModel.collection.drop().then(() => {
                done();
            });

        });

        after((done) => {

            mongoose.connection.close().then(() => {
                done();
            });

        });

        it('is a function', (done) => {
            expect(resultModel).to.be.a('function');

            done();
        });

        it('method find should return an array with one object', (done) => {

            resultModel.find(helpers.RESULT_MODEL.EXAMPLE_DATA, (err, results) => {
                if (results.length !== 1) {
                    throw Error('Something went wrong!');
                }

                done();
            });

        });

        it('method save on object with all the same properties should return an new object', (done) => {
            const resultN = new resultModel(helpers.RESULT_MODEL.EXAMPLE_DATA);

            resultN.save((err, result) => {
                if (!result) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('new result object created only with required object properties:\n        - name,\n        - created,\n        - position.coordinates,\n        - country,\n        - state,\n        - city,\n        - district,\n        - last_metering.created,\n        - last_metering.pm25,\n        - last_metering.pm10,\n        - last_metering.temp_out1,\n        - last_metering.hum_out1\n        * should return correct object', () => {
            const resultEqual = {
                name: result.name,
                created: result.created,
                position: {
                    coordinates: [
                        result.position.coordinates[0],
                        result.position.coordinates[1]
                    ]
                },
                country: result.country,
                state: result.state,
                city: result.city,
                district: result.district,
                last_metering: {
                    created: result.last_metering.created,
                    pm25: result.last_metering.pm25,
                    pm10: result.last_metering.pm10,
                    temp_out1: result.last_metering.temp_out1,
                    hum_out1: result.last_metering.hum_out1
                }
            };

            expect(resultEqual).to.deep.equal(helpers.RESULT_MODEL.EXAMPLE_DATA);
        });
    });

});
