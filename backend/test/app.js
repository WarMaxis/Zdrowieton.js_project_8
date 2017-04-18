/* eslint no-unused-vars: ["error", { "args": "none" }] */


'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const helpers = require('./helpers/helpers');
helpers.baseUrl = `http://${helpers.HOST}:${helpers.PORT}`;


// NODE MODULES
const request = require('request');


// APP CONFIG
const APP_CONFIG = require('../app.config');


// APP MODULES
const app = require('../app.source');


describe('[NORMAL-MOD] Application responses:', () => {
    if (APP_CONFIG.MODE !== 'normal') {
        return;
    }

    describe('GET: /', () => {
        let Normal_Server;

        before(() => {
            Normal_Server = app.appSource(helpers.PORT, helpers.HOST);
        });

        after(() => {
            Normal_Server.close();
        });

        it('should returns status code: 200', (done) => {
            setTimeout(() => {
                request.get(helpers.baseUrl, (error, response, body) => {
                    if (error) {
                        throw error;
                    }

                    expect(response.statusCode).to.equal(200);

                    done();
                });
            }, 5000);
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            setTimeout(() => {
                request.get(helpers.baseUrl, (error, response, body) => {
                    if (error) {
                        throw error;
                    }

                    expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                    done();
                });
            }, 5000);
        });
    });

});


describe('[ANGULAR-MOD] Application responses:', () => {
    if (APP_CONFIG.MODE !== 'angular') {
        return;
    }

    describe('GET: /', () => {
        let Angular_Server;

        before(() => {
            Angular_Server = app.appSource(helpers.PORT, helpers.HOST);
        });

        after(() => {
            Angular_Server.close();
        });

        it('should returns status code: 200', (done) => {
            setTimeout(() => {
                request.get(helpers.baseUrl, (error, response, body) => {
                    if (error) {
                        throw error;
                    }

                    expect(response.statusCode).to.equal(200);

                    done();
                });
            }, 5000);
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            setTimeout(() => {
                request.get(helpers.baseUrl, (error, response, body) => {
                    if (error) {
                        throw error;
                    }

                    expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                    done();
                });
            }, 5000);
        });
    });

});


describe('[API-MOD] Application responses:', () => {
    if (APP_CONFIG.MODE !== 'api') {
        return;
    }

    describe('GET: /', () => {
        let API_Server;

        before(() => {
            API_Server = app.appSource(helpers.PORT, helpers.HOST);
        });

        after(() => {
            API_Server.close();
        });

        it('should returns status code: 200', (done) => {
            setTimeout(() => {
                request.get(helpers.baseUrl, (error, response, body) => {
                    if (error) {
                        throw error;
                    }

                    expect(response.statusCode).to.equal(200);

                    done();
                });
            }, 5000);
        });

        it('should returns header with a value of property content-type: application/json; charset=utf-8', (done) => {
            setTimeout(() => {
                request.get(helpers.baseUrl, (error, response, body) => {
                    if (error) {
                        throw error;
                    }

                    expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');

                    done();
                });
            }, 5000);
        });
    });

});
