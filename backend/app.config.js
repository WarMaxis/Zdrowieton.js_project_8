// APP CONFIG
module.exports = {
    MODE: 'normal', // normal / angular / api <-- Only these modes available
    HOST: 'localhost', // Development server will be on address: http://localhost:4000
    PORT: 4848,
    ENV: 'development',
    MONGO_DB: { // MongoDB Config - mongodb://USER:PASSWORD@HOST:PORT/NAME
        USER: '',
        PASSDOWRD: '',
        HOST: 'localhost',
        PORT: 27017,
        NAME: 'smogly-data-visualizer',
        OPTIONS: {
            config: {
                autoIndex: true
            }
        }
    },
    APP_CONFIG: 'app.config.js',
    HTTP_CODES_CONFIG: require('./httpCodes.config.js'),
    ROUTES_CONFIG: require('./routes.config.js'),
    PAGES_CONFIG: require('./pages.config.js'),
    DIRECTORY: {
        STATIC_DIR: '/assets', // Static files directory
    }
};
