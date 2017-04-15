// APP CONFIG
module.exports = {
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
    MODE: 'normal', // normal / angular / api <-- Only these modes available
    LANGUAGES: [ // All HTML files need to have a language suffix e.g index-en.html etc.
        'pl', // First element is default variable - Is returned in all otherwise cases of a request, which hasn't specified language value.
        'en'
    ],
    PAGE: {
        TYPES: [
            'normal',
            'redirect'
        ],
        DEFAULT_TYPE: 'normal'
    },
    ROUTE: {
        METHODS: [
            'get',
            'post',
            'put',
            'delete'
        ],
        DEFAULT_METHOD: 'get',
        DEFAULT_CONTROLLER: 'mainController'
    },
    MAIN_PAGE: { // Global settings for pages: MAIN, 404, 500 and REDIRECT. Sets up, which page should be displayed as the main page, 404 error page, 500 error page and redirect page.
        NAME: 'main page',
        URL: '/home'
    },
    404: {
        NAME: '404 page',
        URL: '/404'
    },
    500: {
        NAME: '500 page',
        URL: '/500'
    },
    REDIRECT: {
        TYPES: [
            'name',
            'url'
        ],
        DEFAULT_TYPE: 'name',
        DEFAULT_NAME: 'main page',
        DEFAULT_URL: '/'
    },
    HTTP_CODE: {
        SUCCESS: 200, // Default status code for all successful responses of page or resource without property 'statusCode'.
        REDIRECT: 301, // Default status code for all redirects and redirect pages without property 'statusCode'.
        SUPPORTED_ERRORS: [ // All supported errors need to be defined in PAGES array and have his own configuration object.
            500, // First element is default variable - Is returned in all otherwise cases of error, which hasn't defined.
            404
        ]
    },
    CONFIG_FILE: 'app.config.js',
    DIRECTORY: {
        STATIC_DIR: '/assets', // Static files directory
        PAGES_DIR: '/assets/pages', // Pages files directory
        CONTROLLERS_DIR: '/controllers' // Controllers files directory
    }
};
