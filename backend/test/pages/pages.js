'use strict';


// CHAI SETUP
const chai = require('chai');
const expect = chai.expect;


// APP PAGES
const pages = require('../../pages/pages');


describe('Pages:', () => {

    describe('pages.js', () => {
        it('is an instance of an array', () => {

            expect(pages).to.be.an.instanceof(Array);

        });

        it('an array should contain only objects', () => {

            pages.forEach((elem) => {

                expect(elem).to.be.an('object');

            });

        });

        it('each object in an array should have correctly completed properties name, url and fileName', () => {

            pages.forEach((elem) => {

                expect(elem).to.have.property('name').and.not.to.be.empty;
                expect(elem).to.have.property('url').and.to.match(/^\/{1}[a-z0-9-_]{1,24}$/);
                expect(elem).to.have.property('fileName').and.not.to.be.empty;

            });

        });
    });

});
