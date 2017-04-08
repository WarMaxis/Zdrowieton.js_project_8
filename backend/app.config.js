// APP CONFIG
module.exports = {
    MONGO_URI: 'mongodb://localhost:27017/pomiary', //'mongodb://mo1685_hdWork:2lOV3CPuwFne5xofIuJ4@85.194.240.29:27017/mo1685_hdWork'
    MODE: 'Angular', // Normal / Angular
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
        NAME: 'main page'
    },
    404: {
        NAME: '404 page'
    },
    500: {
        NAME: '500 page'
    },
    REDIRECT: {
        NAME: 'main page'
    },
    PAGES: [ // All types of pages need to be defined in this array. Always required object properties: name, url and fileName in some cases statusCode, type, root and redirect are required.
        { // Example page type:  main ---> Remember to create all new pages according to below examples of all available types of pages.
            name: 'main page',
            url: 'home',
            fileName: 'index',
            type: 'main',
            root: '/assets'
        }, { // Example page type: normal
            name: 'dashboard page',
            url: 'dashboard',
            fileName: 'dashboard',
            type: 'normal'
        }, { // Example page type: 404
            name: '404 page',
            url: '404',
            statusCode: 404,
            fileName: '404',
            type: '404'
        }, { // Example page type: 500
            name: '500 page',
            url: '500',
            statusCode: 500,
            fileName: '500',
            type: '500'
        }, { // Example page type: redirect
            name: 'redirect',
            url: 'redirect',
            statusCode: 301,
            type: 'redirect',
            redirect: {
                name: 'dashboard page'
            }
        }
    ],
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
        PAGES_DIR: '/assets/pages' // Pages files directory
    }
};
