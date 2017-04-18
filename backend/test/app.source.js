'use strict';


// CHAI SETUP
const chai = require('chai');
const expect = chai.expect;


// APP MODULES
const app = require('../app.source');


describe('Application modules:', () => {

    describe('app.source.js', () => {
        it('is an object', () => {

            expect(app).to.be.an('object');

        });
    });

});
