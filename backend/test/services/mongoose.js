'use strict';


// CHAI SETUP
const chai = require('chai');
const expect = chai.expect;


// APP SERVICES
const mongoose = require('../../services/mongoose');


describe('Services:', () => {

    describe('mongoose.js', () => {
        it('is an object', () => {

            expect(mongoose).to.be.an('object');

        });
    });

});
