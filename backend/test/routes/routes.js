'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const helpers = require('../helpers/helpers');


// APP ROUTES
const routes = require('../../routes/routes');


describe('Routes:', () => {

    describe('routes.js', () => {
        it('is an object', () => {

            expect(routes).to.be.an('object');

        });

        helpers.MODES_ARRAY.forEach((elem) => {

            it(`an object should have property ${elem}`, () => {
                expect(routes).to.have.property(elem).and.to.be.an('array');
            });

            it(`${elem} object property should be an array`, () => {
                expect(routes[elem]).to.be.an('array');
            });

            it(`${elem} mod <array> should contain only objects`, () => {
                routes[elem].forEach((el) => {
                    expect(el).to.be.an('object');
                });
            });

            it(`each object in ${elem} mod <array> should have property url`, () => {
                routes[elem].forEach((el) => {
                    expect(el).to.have.property('url');
                });
            });

        });
    });

});
