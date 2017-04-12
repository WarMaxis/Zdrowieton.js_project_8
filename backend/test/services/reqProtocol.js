'use strict';


// CHAI SETUP
const chai = require('chai');
const expect = chai.expect;


// NODE MODULES
const mocks = require('node-mocks-http');
const reqHttp = mocks.createRequest({
    secure: true,
    headers: {
        'x-forwarded-proto': 'http, http'
    }
});
const reqHttps = mocks.createRequest({
    secure: false,
    headers: {
        'x-forwarded-proto': 'https, https'
    }
});
const reqHttpNSecure = mocks.createRequest({
    secure: false
});
const reqHttpSecure = mocks.createRequest({
    secure: true
});


// APP SERVICES
const reqProtocol = require('../../services/reqProtocol');


describe('Services:', () => {
    describe('reqProtocol.js', () => {
        it('is a function', () => {

            expect(reqProtocol).to.be.a('function');

        });

        it('without any arguments should return false', () => {

            expect(reqProtocol()).to.be.false;

        });

        it('with req argument containing req.headers[x-forwarded-proto] = http, http should return http', () => {

            expect(reqProtocol(reqHttp)).to.equal('http');

        });

        it('with req argument containing req.headers[x-forwarded-proto] = https, https should return https', () => {

            expect(reqProtocol(reqHttps)).to.equal('https');

        });

        it('with req argument containing only req.secure = false should return http', () => {

            expect(reqProtocol(reqHttpNSecure)).to.equal('http');

        });

        it('with req argument containing only req.secure = true should return https', () => {

            expect(reqProtocol(reqHttpSecure)).to.equal('https');

        });
    });

});
