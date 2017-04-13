// NODE MODULES
const mongoose = require('../services/mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


const resultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        coordinates: {
            type: [Number],
            required: true
        }
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    last_metering: {
        created: {
            type: String,
            required: true,
            unique: true
        },
        pm25: {
            type: Number,
            required: true
        },
        pm10: {
            type: Number,
            required: true
        },
        pm01: {
            type: Number,
            required: true
        }
    }
}, {
    versionKey: false
});


resultSchema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Result', resultSchema);
