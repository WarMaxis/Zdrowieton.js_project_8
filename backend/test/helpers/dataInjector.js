'use strict';


// CHAI SETUP
const chai = require('chai');
const expect = chai.expect;


// APP HELPERS
const dataInjector = require('../../helpers/dataInjector');


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
let routeModel;


describe('Helpers:', () => {

    describe('dataInjector.js', () => {
        beforeEach(() => {
            routeModel = mongoose.models.Route ? mongoose.model('Route') : mongoose.model('Route', require('../../models/route').schema);
        });

        it('is a function', () => {
            expect(dataInjector).to.be.a('function');
        });

        it('without any arguments should return false', () => {
            expect(dataInjector()).to.be.false;
        });

        it('with required object property model (correct) and array should return true', () => {
            expect(dataInjector({
                model: routeModel,
                array: []
            })).to.be.true;
        });

        it('with required arguments model (correct) and array should return true', () => {
            expect(dataInjector(routeModel, [])).to.be.true;
        });
    });

});
