//Herlpers - Here put all your needed variables & functions for unit testing
module.exports = {
    HOST: 'localhost', // Test server will be on address: http://localhost:5858
    PORT: 5848,
    MONGO_DB: { // MongoDB Config - mongodb://USER:PASSWORD@HOST:PORT/NAME
        USER: '',
        PASSDOWRD: '',
        HOST: 'localhost',
        PORT: 27017,
        NAME: 'smogly-data-visualizer-test',
        OPTIONS: {
            config: {
                autoIndex: true
            }
        }
    },
    RESULT_MODEL: { // Used in test/models/result.js
        EXAMPLE_DATA: {
            name: 'Smogly Test Station 2',
            created: '2017-04-06T21:34:06.167069Z',
            position: {
                coordinates: [
                    20.973243713381,
                    52.241020202637
                ]
            },
            country: 'Polska',
            state: 'Mazowieckie',
            city: 'Warszawa',
            district: 'Wola',
            last_metering: {
                created: '2017-04-16T22:52:14.983957Z',
                pm25: 10,
                pm10: 12,
                temp_out1: 25.6,
                hum_out1: 39.4
            }
        }
    }
};
