/* eslint no-console: 0 */


// NODE MODULES
const chalk = require('chalk');


// To display a colourful console log message in five types: normal, success, info, warning and error
module.exports = function alertHandler(type, message, title, ...args) {
    const types = {
        normal: 'white',
        success: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'red'
    };

    if (arguments.length === 1 && typeof type === 'object') {
        args = type;
    }

    type = args.type || type;
    type = types[type] ? type : 'info';
    message = args.message || message || 'Remember to specify necessary property type & message in a configuration object or pass arguments in the same order.';
    title = args.title || title || type;
    const color = types[type];

    const messageTemplate = `
**~~~~~~~~* ${title.toUpperCase()} LOG - OPEN *~~~~~~~~~**
${typeof message === 'object' ? JSON.stringify(message) : message}
**~~~~~~~~* ${title.toUpperCase()} LOG - CLOSE *~~~~~~~~**`;

    console.log(chalk[color](messageTemplate));

};
