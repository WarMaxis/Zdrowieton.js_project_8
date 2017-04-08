/* eslint no-unused-vars: ["error", { "args": "none" }] */


'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;


// LOCAL MODULES
const routesInjector = require('../../helpers/routesInjector');
const app = new require('express')();
const baseUrl = 'http://localhost:3880/';
const Route = require('../../models/route');
const routeO = new Route('/testo');
const routeA = new Route('/testa');
const RoutesArray = require('../../models/routesArray');
const routesArray = new RoutesArray(Route);
routesArray.addRoute(routeO);
routesArray.addRoute(routeA);
const request = require('request');


describe('Helpers:', () => {
    let createServer;

    before(() => {
        createServer = app.listen(3880);
    });

    after(() => {
        createServer.close();
    });

    describe('routesInjector.js', () => {
        it('is a function', () => {

            expect(routesInjector).to.be.a('function');

        });

        it('without any arguments should return false', () => {

            expect(routesInjector()).to.be.false;

        });

        it('without object property appObj should return false', () => {

            expect(routesInjector({
                routeObj: routeO,
                routesArr: routesArray
            })).to.be.false;

        });

        it('without argument appObj should return false', () => {

            expect(routesInjector(null, routeA, routesArray)).to.be.false;

        });

        it('without object properties routeObj and routesArr should return false', () => {

            expect(routesInjector({
                appObj: app
            })).to.be.false;

        });

        it('without arguments routeObj and routesArr should return false', () => {

            expect(routesInjector(app)).to.be.false;

        });

        it('with required object properties appObj and routeObj should adds new route', (done) => {

            routesInjector({
                appObj: app,
                routeObj: routeO
            });

            request.get(`${baseUrl}testo`, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });

        });

        it('with required arguments appObj and routeObj should adds new route', (done) => {

            routesInjector(app, routeA);

            request.get(`${baseUrl}testa`, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });

        });

        it('with required object properties appObj and routesArr should adds new route', (done) => {

            routesInjector({
                appObj: app,
                routesArr: routesArray
            });

            request.get(`${baseUrl}testo`, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });

        });

        it('with required arguments appObj and routesArr should adds new route', (done) => {

            routesInjector(app, null, routesArray);

            request.get(`${baseUrl}testa`, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });

        });
    });

});
