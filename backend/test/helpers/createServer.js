'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const helpers = require('./helpers');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);


// MOCKED MODULES
function appMock() {
    const init = () => {
        init.listen = () => {};
    };

    init();

    return init;
}
const app = appMock();


// APP HELPERS
const createServer = require('../../helpers/createServer');


describe('Helpers:', () => {

    describe('createServer.js', () => {
        beforeEach(() => {
            sinon.spy(app, 'listen');
        });

        afterEach(() => {
            app.listen.restore();
        });

        it('is a function', () => {
            expect(createServer).to.be.a('function');
        });

        it('without any arguments should return false', () => {
            expect(createServer()).to.be.false;
        });

        it('with required object properties app, port and host should call function app.listen(port, host)', () => {
            createServer({
                app: app,
                port: helpers.PORT,
                host: helpers.HOST
            });

            expect(app.listen).to.have.been.calledOnce;
        });

        it('with required arguments app, port and host should call function app.listen(port, host)', () => {
            createServer(app, helpers.PORT, helpers.HOST);

            expect(app.listen).to.have.been.calledOnce;
        });

        it('without required object property or argument app should return false', () => {
            expect(createServer({
                app: null,
                port: helpers.PORT,
                host: helpers.HOST
            })).to.be.false;

            expect(createServer(null, helpers.PORT, helpers.HOST)).to.be.false;
        });

        it('without required object property or argument port should return false', () => {
            expect(createServer({
                app: app,
                port: null,
                host: helpers.HOST
            })).to.be.false;

            expect(createServer(app, null, helpers.HOST)).to.be.false;
        });

        it('without required object property or argument host should return false', () => {
            expect(createServer({
                app: app,
                port: helpers.PORT,
                host: null
            })).to.be.false;

            expect(createServer(app, helpers.PORT, null)).to.be.false;
        });

        it('with wrong object property or argument app should return false', () => {
            expect(createServer({
                app: () => {},
                port: helpers.PORT,
                host: helpers.HOST
            })).to.be.false;

            expect(createServer(() => {}, helpers.PORT, helpers.HOST)).to.be.false;
        });
    });

});
