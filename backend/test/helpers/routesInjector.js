/* eslint no-unused-vars: ["error", { "args": "none" }] */


'use strict';


// CHAI SETUP
const chai = require('chai');
const expect = chai.expect;


// APP HELPERS
const routesInjector = require('../../helpers/routesInjector');


describe('Helpers:', () => {
    before(() => {

    });

    beforeEach(() => {

    });

    afterEach(() => {

    });

    after(() => {

    });

    describe('routesInjector.js', () => {
        it('is a function', () => {

            expect(routesInjector).to.be.a('function');

        });

        it('without any arguments should return false', () => {

            expect(routesInjector()).to.be.false;

        });

        it('without object property appObj should return false', () => {

        });

        it('without argument appObj should return false', () => {

        });

        it('without object properties routeObj and routesArr should return false', () => {

        });

        it('without arguments routeObj and routesArr should return false', () => {

        });

        it('with required object properties appObj and routeObj should adds new route', () => {

        });

        it('with required arguments appObj and routeObj should adds new route', () => {

        });

        it('with required object properties appObj and routesArr should adds new route', () => {

        });

        it('with required arguments appObj and routesArr should adds new route', () => {

        });
    });

});
