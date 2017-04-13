// NODE MODULES
const mongoose = require('../services/mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


// APP CONFIG
const APP_CONFIG = require('../app.config');


const routeSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    method: {
        type: String,
        default: APP_CONFIG.ROUTE.DEFAULT_METHOD
    },
    controller: {
        type: String,
        default: APP_CONFIG.ROUTE.DEFAULT_CONTROLLER
    }
}, {
    versionKey: false
});


routeSchema.methods.getController = function () {
    return require(`../${APP_CONFIG.DIRECTORY.CONTROLLERS_DIR}/${this.controller}`);
};


routeSchema.plugin(mongooseUniqueValidator);


module.exports = {
    schema: routeSchema,
    model: mongoose.model('Route', routeSchema)
};
