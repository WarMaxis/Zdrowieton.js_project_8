'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;


// APP CONFIG
const APP_CONFIG = require('../../app.config.js');


// LOCAL MODULES
const Page = require('../../models/page.js');


describe('Models:', () => {

    describe('page.js', () => {

        it('is a function', () => {

            expect(Page).to.be.a('function');

        });

        it('constructor name is Page', () => {

            expect(new Page({
                name: 'test',
                url: '/test',
                fileName: 'test'
            }).constructor.name).to.equal('Page');

        });

        it('constructor without any arguments should throw an error', () => {
            let error;

            try {
                new Page();
            } catch (e) {
                error = e;
            }

            if (!error) {
                throw Error('Page constructor does not pass test.');
            }
        });

        it('constructor without specified required any of three first object properties name, url and fileName should throw an error', () => {
            let errorCounter = 0;

            try {
                new Page({
                    url: '/test',
                    fileName: 'test'
                });
            } catch (e) {
                errorCounter++;
            }

            try {
                new Page({
                    name: 'test',
                    fileName: 'test'
                });
            } catch (e) {
                errorCounter++;
            }

            try {
                new Page({
                    name: 'test',
                    url: '/test'
                });
            } catch (e) {
                errorCounter++;
            }

            if (errorCounter !== 3) {
                throw Error('Page constructor does not pass test.');
            }
        });

        it('constructor with specified required object properties (name, url and fileName) should return an new object', () => {

            expect(new Page({
                name: 'test',
                url: '/test',
                fileName: 'test'
            })).to.be.an('object');

        });

        it('a new object with specified object properties name, url, fileName, statusCode, type and root should contain object properties with the same values', () => {
            const page = new Page({
                name: 'test',
                url: '/test',
                fileName: 'test',
                statusCode: 200,
                type: 'test',
                root: '/test'
            });

            expect(page).to.deep.equal({
                name: 'test',
                url: '/test',
                fileName: 'test',
                statusCode: 200,
                type: 'test',
                root: '/test'
            });
        });

        it('constructor without specified required any of three first arguments name, url and fileName should throw an error', () => {
            let errorCounter = 0;

            try {
                new Page(null, null, null);
            } catch (e) {
                errorCounter++;
            }

            try {
                new Page(null, null);
            } catch (e) {
                errorCounter++;
            }

            try {
                new Page(null);
            } catch (e) {
                errorCounter++;
            }

            if (errorCounter !== 3) {
                throw Error('Page constructor does not pass test.');
            }
        });

        it('constructor with specified required first three arguments (name, url and fileName) should return an new object', () => {

            expect(new Page('test', '/test', 'test')).to.be.an('object');

        });

        it('a new object with specified arguments name, url, fileName, statusCode, type and root should contain object properties with the same values', () => {
            const page = new Page('test', '/test', 'test', 200, 'test', '/test');

            expect(page).to.deep.equal({
                name: 'test',
                url: '/test',
                fileName: 'test',
                statusCode: 200,
                type: 'test',
                root: '/test'
            });
        });

        it('an object metod fullFileName() should return file name in default language', () => {
            const pageO = new Page({
                name: 'test',
                url: '/test',
                fileName: 'test',
                statusCode: 200,
                type: 'test',
                root: '/test'
            });
            const pageA = new Page('test', '/test', 'test', 200, 'test', '/test');

            expect(pageO.fullFileName()).to.equal(`test-${APP_CONFIG.LANGUAGES[0]}.html`);
            expect(pageA.fullFileName()).to.equal(`test-${APP_CONFIG.LANGUAGES[0]}.html`);
        });

        it('an object metod fullFileName("en") should return file name in english language', () => {
            const pageO = new Page({
                name: 'test',
                url: '/test',
                fileName: 'test',
                statusCode: 200,
                type: 'test',
                root: '/test'
            });
            const pageA = new Page('test', '/test', 'test', 200, 'test', '/test');

            expect(pageO.fullFileName('en')).to.equal('test-en.html');
            expect(pageA.fullFileName('en')).to.equal('test-en.html');
        });

    });

});
