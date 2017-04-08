// APP CONFIG
const APP_CONFIG = require('../app.config.js');


module.exports = class Page {
    constructor(name, url, fileName, statusCode, type, root, ...args) {
        if (arguments.length === 0) {
            throw Error(`Specify an arguments <name[string], url[string], fileName[string], statusCode[number:default ${APP_CONFIG.HTTP_CODE.SUCCESS}], type[string:default ${APP_CONFIG.PAGE.DEFAULT_TYPE}], root[string:default ${APP_CONFIG.DIRECTORY.PAGES_DIR}]> or an object properties {name: <string>, url: <string>, fileName: <string>, statusCode: <number:default ${APP_CONFIG.HTTP_CODE.SUCCESS}>, type: <string:default ${APP_CONFIG.PAGE.DEFAULT_TYPE}>, root: <string:default ${APP_CONFIG.DIRECTORY.PAGES_DIR}>}.`);
        }

        if (arguments.length === 1 && typeof arguments[0] === 'object') {
            args = arguments[0];

            if (!args.name || !args.url || !args.fileName) {
                throw Error(`Error: Bad arguments ${JSON.stringify(arguments)}. Specify required object properties: {name: <string>, url: <string>, fileName: <string>}.`);
            }
        } else {
            if (!name || !url || !fileName) {
                throw Error(`Error: Bad arguments ${JSON.stringify(arguments)}. Specify required arguments: <name[string], url[string], fileName[string]>.`);
            }
        }

        this.name = args.name || name;
        this.url = args.url || url;
        this.fileName = args.fileName || fileName;
        this.statusCode = args.statusCode || statusCode || APP_CONFIG.HTTP_CODE.SUCCESS;
        this.type = args.type || type || APP_CONFIG.PAGE.DEFAULT_TYPE;
        this.root = args.root || root || APP_CONFIG.DIRECTORY.PAGES_DIR;
    }

    fullFileName(lang) {
        return `${this.fileName}-${lang || APP_CONFIG.LANGUAGES[0]}.html`;
    }
};
