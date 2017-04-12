const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    name: String,
    position: {
        coordinates: [Number]
    },
    city: String,
    district: String,
    last_metering: {
        created: String,
        pm25: Number,
        pm10: Number,
        pm01: Number
    }
});

module.exports = mongoose.model('Result', resultSchema);
