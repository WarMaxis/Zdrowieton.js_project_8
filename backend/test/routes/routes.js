'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;


// LOCAL MODULES
const routes = require('../../routes/routes');


describe('Routes:', () => {

    describe('routes.js', () => {
        it('is an array', () => {

            expect(routes).to.be.an('array');

        });

        it('an array should contain only objects', () => {

            routes.forEach((elem) => {

                expect(elem).to.be.an('object');

            });

        });
    });

});
