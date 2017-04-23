// NODE MODULES
const mongoose = require('../../services/mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


const resultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    },
    position: {
        coordinates: {
            type: [Number],
            required: true
        }
    },
    country: {
        type: String,
        require: true
    },
    state: {
        type: String,
        required: true
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
            required: true
        },
        pm25: {
            type: Number,
            required: true
        },
        pm10: {
            type: Number,
            required: true
        },
        temp_out1: {
            type: Number
        },
        hum_out1: {
            type: Number
        }
    }
}, {
    versionKey: false
});


resultSchema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Result', resultSchema);
