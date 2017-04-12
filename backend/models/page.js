// NODE MODULES
const mongoose = require('../services/mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


// APP CONFIG
const APP_CONFIG = require('../app.config');


const pageSchema = new mongoose.Schema({
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
        default: APP_CONFIG.HTTP_CODE.SUCCESS
    },
    fileName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: APP_CONFIG.PAGE.DEFAULT_TYPE
    },
    redirect: {
        type: {
            type: String,
            default: APP_CONFIG.REDIRECT.DEFAULT_TYPE
        },
        name: {
            type: String,
            default: APP_CONFIG.REDIRECT.DEFAULT_NAME
        },
        url: {
            type: String,
            default: APP_CONFIG.REDIRECT.DEFAULT_URL
        },
        statusCode: {
            type: Number,
            default: APP_CONFIG.HTTP_CODE.REDIRECT
        }
    },
    root: {
        type: String,
        default: APP_CONFIG.DIRECTORY.PAGES_DIR
    }
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
