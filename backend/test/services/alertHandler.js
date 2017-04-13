/* eslint no-console: 0 */


'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);


// NODE MODULES
const chalk = require('chalk');


// APP SERVICES
const alertHandler = require('../../services/alertHandler');


//USEFUL FUNCTIONS
const messageTemplate = (title, message) => {
    return `
**~~~~~~~~* ${title.toUpperCase()} LOG - OPEN *~~~~~~~~~**
${message}
**~~~~~~~~* ${title.toUpperCase()} LOG - CLOSE *~~~~~~~~**`;
};


describe('Services:', () => {
    describe('alertHandler.js', () => {
        beforeEach(() => {

            sinon.spy(console, 'log');

        });

        afterEach(() => {

            console.log.restore();

        });

        it('is a function', () => {

            expect(alertHandler).to.be.a('function');

        });

        it('without any arguments should display a console.log message with info style', () => {
            alertHandler();

            expect(console.log).to.always.have.been.calledWith(chalk.blue(messageTemplate('Info', 'Remember to specify necessary property type & message in a configuration object or pass arguments in the same order.')));
        });

        it('with specified arguments type: normal, message: Normal message! and title: Normal title should display a console.log message with normal style', () => {
            const type = 'normal';
            const message = 'Normal message!';
            const title = 'Normal title';

            alertHandler(type, message, title);

            expect(console.log).to.always.have.been.calledWith(chalk.white(messageTemplate(title, message)));
        });

        it('with specified arguments type: success, message: Success message! and title: Success title should display a console.log message with success style', () => {
            const type = 'success';
            const message = 'Success message!';
            const title = 'Success title';

            alertHandler(type, message, title);

            expect(console.log).to.always.have.been.calledWith(chalk.green(messageTemplate(title, message)));
        });

        it('with specified arguments type: info, message: Info message! and title: Info title should display a console.log message with info style', () => {
            const type = 'info';
            const message = 'Info message!';
            const title = 'Info title';

            alertHandler(type, message, title);

            expect(console.log).to.always.have.been.calledWith(chalk.blue(messageTemplate(title, message)));
        });

        it('with specified arguments type: warning, message: Warning message! and title: Warning title should display a console.log message with warning style', () => {
            const type = 'warning';
            const message = 'Warning message!';
            const title = 'Warning title';

            alertHandler(type, message, title);

            expect(console.log).to.always.have.been.calledWith(chalk.yellow(messageTemplate(title, message)));
        });

        it('with specified arguments type: error, message: Error message! and title: Error title should display a console.log message with error style', () => {
            const type = 'error';
            const message = 'Error message!';
            const title = 'Error title';

            alertHandler(type, message, title);

            expect(console.log).to.always.have.been.calledWith(chalk.red(messageTemplate(title, message)));
        });
    });
});
