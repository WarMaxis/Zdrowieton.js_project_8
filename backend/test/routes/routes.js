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

            it(`${elem} mode <array> should contain only objects`, () => {
                routes[elem].forEach((el) => {
                    expect(el).to.be.an('object');
                });
            });

            it(`each object in ${elem} mode <array> should have property url`, () => {
                routes[elem].forEach((el) => {
                    expect(el).to.have.property('url');
                });
            });

            it(`each object property url in ${elem} mode <array> should be a string or an array of strings e.g. '/newOne'`, () => {
                const regExp = /(^\/{1}[a-z0-9-_:{}*\/]{0,50}$|^\*$)/;

                routes[elem].forEach((el) => {
                    let url = el.url;

                    expect(typeof url === 'string' || url instanceof Array).to.be.true;

                    if (typeof url === 'string') {
                        expect(url).to.match(regExp);
                    }

                    if (url instanceof Array) {
                        url.forEach((el) => {
                            expect(el).to.match(regExp);
                        });
                    }
                });
            });
        });
    });

});
