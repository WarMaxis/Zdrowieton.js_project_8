// PAGES CONFIG
module.exports = {
    LANGUAGES: [ // All HTML files need to have a language suffix e.g index-en.html etc.
        'pl', // First element is default variable - Is returned in all otherwise cases of a request, which hasn't specified language value.
        'en'
    ],
    MODEL: {
        TYPES: [
            'normal',
            'redirect'
        ],
        DEFAULT_TYPE: 'normal',
        REDIRECT: {
            TYPES: [
                'name',
                'url'
            ],
            DEFAULT_TYPE: 'name',
            DEFAULT_NAME: 'main page',
            DEFAULT_URL: '/home'
        }
    },
    MAIN_PAGE: { // Global settings for pages: MAIN, 404, 500 and REDIRECT. Sets up, which page should be displayed as the main page, 404 error page, 500 error page and redirect page.
        NAME: 'main page',
        URL: '/home',
        IN_CASES: /^\/{1}[a-z]{2}(\/{0,1}|\/{1}home\/{0,1})$/i
    },
    404: {
        NAME: '404 page',
        URL: '/404',
        NOT_IN_CASES: /^(\/|\/{1}[a-z]{2}\/{0,1}|\/{1}[a-z]{2}\/{1}[a-z0-9-_]{1,24}\/{0,1})$/i
    },
    500: {
        NAME: '500 page',
        URL: '/500'
    },
    REDIRECT: {
        NAME: 'main page',
        URL: '/home',
        IN_CASES: /^\/{0,}$/
    },
    HEADERS: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Expires': 0,
        'Pragma': 'no-cache'
    },
    DIRECTORY: {
        PAGES_DIR: '/assets/pages', // Pages files directory
    }
};
