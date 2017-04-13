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
let pageModel,
    page;


describe('Models:', () => {

    describe('page.js', () => {
        before((done) => {

            mongoose.connect(`mongodb://${helpers.MONGO_DB.USER}:${helpers.MONGO_DB.PASSDOWRD}@${helpers.MONGO_DB.HOST}:${helpers.MONGO_DB.PORT}/${helpers.MONGO_DB.NAME}`, helpers.MONGO_DB.OPTIONS, (err) => {
                if (err) {
                    console.log(err.message);
                }

                done();
            });

        });

        beforeEach((done) => {
            pageModel = mongoose.models.Page ? mongoose.model('Page') : mongoose.model('Page', require('../../models/page').schema);

            page = new pageModel(helpers.PAGE_MODEL.EXAMPLE_DATA);

            page.save((err, page) => {
                if (err) {
                    console.log('1.', err.message);
                }

                done();
            });
        });

        afterEach((done) => {

            pageModel.collection.drop().then(() => {
                done();
            });

        });

        after((done) => {

            mongoose.connection.close().then(() => {
                done();
            });

        });

        it('is a function', (done) => {
            expect(pageModel).to.be.a('function');

            done();
        });

        it('method find should return an array with one object', (done) => {

            pageModel.find(helpers.PAGE_MODEL.EXAMPLE_DATA, (err, results) => {
                if (results.length !== 1) {
                    throw Error('Something went wrong!');
                }

                done();
            });

        });

        it('method save on object with the same property name should return an error', (done) => {
            const pageN = new pageModel({
                name: 'test',
                url: '/test1',
                fileName: 'test1'
            });

            pageN.save((err, page) => {
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('method save on object with the same property url should return an error', (done) => {
            const pageU = new pageModel({
                name: 'test1',
                url: '/test',
                fileName: 'test1'
            });

            pageU.save((err, page) => {
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('page model constructor without required object properties name, url and fileName should return an error', (done) => {
            pageModel.create({
                url: '/test',
                fileName: 'test'
            }, (err, page) => {
                if (!err) {
                    throw Error('Something went wrong!');
                }
            });

            pageModel.create({
                name: 'test',
                fileName: 'test'
            }, (err, page) => {
                if (!err) {
                    throw Error('Something went wrong!');
                }
            });

            pageModel.create({
                name: 'test',
                url: '/test'
            }, (err, page) => {
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('new page object created only with required object properties name, url and fileName should return correct object', () => {
            const pageEqual = {
                name: page.name,
                url: page.url,
                statusCode: page.statusCode,
                fileName: page.fileName,
                type: page.type,
                redirect: {
                    statusCode: page.redirect.statusCode,
                    type: page.redirect.type,
                    name: page.redirect.name,
                    url: page.redirect.url
                },
                root: page.root
            };

            expect(pageEqual).to.deep.equal(helpers.PAGE_MODEL.EQUAL_PAGE);
        });

        it('new page object created with all random object properties should return correct object', () => {
            page = new pageModel(helpers.PAGE_MODEL.RANDOM_EQUAL_PAGE);
            const pageEqual = {
                name: page.name,
                url: page.url,
                statusCode: page.statusCode,
                fileName: page.fileName,
                type: page.type,
                redirect: {
                    statusCode: page.redirect.statusCode,
                    type: page.redirect.type,
                    name: page.redirect.name,
                    url: page.redirect.url
                },
                root: page.root
            };

            expect(pageEqual).to.deep.equal(helpers.PAGE_MODEL.RANDOM_EQUAL_PAGE);
        });

        it('method fullUrl should return full url with language param: /pl/test', () => {
            expect(page.fullUrl('pl')).to.equal('/pl/test');
        });

        it('method fullFileName should return full file name with language suffix (-pl) and extension (.html): test-pl.html', () => {
            expect(page.fullFileName('pl')).to.equal('test-pl.html');
        });
    });

});
