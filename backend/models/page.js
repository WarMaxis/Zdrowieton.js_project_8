// NODE MODULES
const mongoose = require('../services/mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


// PAGES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;
const PAGES_CONFIG = require('../app.config').PAGES_CONFIG;


const pageSchema = new mongoose.Schema({
    type: {
        type: String,
        default: PAGES_CONFIG.MODEL.DEFAULT_TYPE
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    statusCode: {
        type: Number,
        default: HTTP_CODES_CONFIG.SUCCESS
    },
    fileName: {
        type: String,
        required: true
    },
    redirect: {
        type: {
            type: String,
            default: PAGES_CONFIG.MODEL.REDIRECT.DEFAULT_TYPE
        },
        name: {
            type: String,
            default: PAGES_CONFIG.MODEL.REDIRECT.DEFAULT_NAME
        },
        url: {
            type: String,
            default: PAGES_CONFIG.MODEL.REDIRECT.DEFAULT_URL
        },
        statusCode: {
            type: Number,
            default: HTTP_CODES_CONFIG.REDIRECT.PERMANENT
        }
    },
    root: {
        type: String,
        default: PAGES_CONFIG.DIRECTORY.PAGES_DIR
    }
}, {
    versionKey: false
});


pageSchema.methods.fullUrl = function (lang) {
    return `/${lang}${this.url}`;
};


pageSchema.methods.fullFileName = function (lang) {
    return `${this.fileName}-${lang}.html`;
};


pageSchema.plugin(mongooseUniqueValidator);


module.exports = {
    schema: pageSchema,
    model: mongoose.model('Page', pageSchema)
};
