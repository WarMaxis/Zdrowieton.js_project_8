var mongoose = require('mongoose');

var pomiarSchema = new mongoose.Schema({
    name: String,
    position: {
        coordinates: [Number]
    },
    city: String,
    district: String,
    lastMetering: {
        created: String,
        pm25: Number,
        pm01: Number,
        pm10: Number
    }
});

module.exports = mongoose.model('Pomiar', pomiarSchema);
