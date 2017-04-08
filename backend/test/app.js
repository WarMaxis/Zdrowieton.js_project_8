/* eslint no-unused-vars: ["error", { "args": "none" }] */


'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const helpers = require('./helpers/helpers');


// APP CONFIG
const APP_CONFIG = require('../app.config');


// LOCAL MODULES
const request = require('request');


describe('[A-MOD] Application responses:', () => {

    describe('GET: /', () => {
        it('should returns status code: 200', (done) => {
            request.get(helpers.baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(helpers.baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it(`should returns page body in a default language: ${APP_CONFIG.LANGUAGES[0]}`, (done) => {
            request.get(helpers.baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp(`.*<html.*lang\=\"${APP_CONFIG.LANGUAGES[0]}\".*`, 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /<any slug>', () => {
        const baseUrl = `${helpers.baseUrl}${helpers.anySlug}`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it(`should returns page body in a default language: ${APP_CONFIG.LANGUAGES[0]}`, (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp(`.*<html.*lang\=\"${APP_CONFIG.LANGUAGES[0]}\".*`, 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /<any slug>/<any slug>', () => {
        const baseUrl = `${helpers.baseUrl}${helpers.anySlug}/${helpers.anySlug}`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it(`should returns page body in a default language: ${APP_CONFIG.LANGUAGES[0]}`, (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp(`.*<html.*lang\=\"${APP_CONFIG.LANGUAGES[0]}\".*`, 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /<any slug>/<any slug>/<any slug>*', () => {
        const baseUrl = `${helpers.baseUrl}${helpers.anySlug}/${helpers.anySlug}/${helpers.anySlug}`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it(`should returns page body in a default language: ${APP_CONFIG.LANGUAGES[0]}`, (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp(`.*<html.*lang\=\"${APP_CONFIG.LANGUAGES[0]}\".*`, 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /// - no follow', () => {
        const baseUrl = `${helpers.baseUrl}//`;

        it('should returns status code: 301', (done) => {
            request.get({
                url: baseUrl,
                followRedirect: false
            }, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(301);

                done();
            });
        });

        it(`should returns header with a value of property location: ${helpers.baseUrl}`, (done) => {
            request.get({
                url: baseUrl,
                followRedirect: false
            }, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['location']).to.equal(helpers.baseUrl);

                done();
            });
        });
    });


    describe('GET: /// - follow', () => {
        const baseUrl = `${helpers.baseUrl}//`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it(`should returns page body in a default language: ${APP_CONFIG.LANGUAGES[0]}`, (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp(`.*<html.*lang\=\"${APP_CONFIG.LANGUAGES[0]}\".*`, 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: ///<any slug>* - no follow', () => {
        const baseUrl = `${helpers.baseUrl}//${helpers.anySlug}`;

        it('should returns status code: 301', (done) => {
            request.get({
                url: baseUrl,
                followRedirect: false
            }, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(301);

                done();
            });
        });

        it(`should returns header with a value of property location: ${helpers.baseUrl}`, (done) => {
            request.get({
                url: baseUrl,
                followRedirect: false
            }, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['location']).to.equal(helpers.baseUrl);

                done();
            });
        });
    });


    describe('GET: ///<any slug>* - follow', () => {
        const baseUrl = `${helpers.baseUrl}//${helpers.anySlug}`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it(`should returns page body in a default language: ${APP_CONFIG.LANGUAGES[0]}`, (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp(`.*<html.*lang\=\"${APP_CONFIG.LANGUAGES[0]}\".*`, 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /pl', () => {
        const baseUrl = `${helpers.baseUrl}pl`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it('should returns page body in a language: pl', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp('.*<html.*lang\=\"pl\".*', 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /pl/<any slug>', () => {
        const baseUrl = `${helpers.baseUrl}pl/${helpers.anySlug}`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it('should returns page body in a default language: pl', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp('.*<html.*lang\=\"pl\".*', 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /pl/<any slug>/<any slug>*', () => {
        const baseUrl = `${helpers.baseUrl}pl/${helpers.anySlug}/${helpers.anySlug}`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it('should returns page body in a default language: pl', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp('.*<html.*lang\=\"pl\".*', 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /en', () => {
        const baseUrl = `${helpers.baseUrl}en`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it('should returns page body in a language: en', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp('.*<html.*lang\=\"en\".*', 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /en/<any slug>', () => {
        const baseUrl = `${helpers.baseUrl}en/${helpers.anySlug}`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it('should returns page body in a default language: en', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp('.*<html.*lang\=\"en\".*', 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });


    describe('GET: /en/<any slug>/<any slug>*', () => {
        const baseUrl = `${helpers.baseUrl}en/${helpers.anySlug}/${helpers.anySlug}`;

        it('should returns status code: 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.statusCode).to.equal(200);

                done();
            });
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                done();
            });
        });

        it('should returns page body in a default language: en', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if (error) {
                    throw error;
                }

                const langRegExp = new RegExp('.*<html.*lang\=\"en\".*', 'g');

                expect(langRegExp.test(body)).to.be.true;

                done();
            });
        });
    });

});
