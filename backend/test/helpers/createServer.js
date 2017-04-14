'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const helpers = require('./helpers');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);


// NODE MODULES



// APP HELPERS
const createServer = require('../../helpers/createServer');


describe('Helpers:', () => {

    describe('createServer.js', () => {
        it('is a function', () => {
            expect(createServer).to.be.a('function');
        });

        it('without any arguments should return false', () => {
            expect(createServer()).to.be.false;
        });

        it('with required object properties app, port and host should call function app.listen(port, host)', () => {

        });

        it('with required arguments app, port and host should call function app.listen(port, host)', () => {

        });
    });

});
