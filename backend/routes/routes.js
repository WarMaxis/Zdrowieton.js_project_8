// Routes - Here you can specified routes for each mode: normal, angular and api.
module.exports = {
    normal: [ // Normal mod routes:
        {
            url: '/normal', // Pattern ---> /(^\/[a-z0-9-_:{}*\/]{0,50}$|^\*$)/
            controller: 'mainController' // default
        },
        {
            url: ['/', '/:lang', '/:lang/*', '/:lang/:page', '/:lang/:page/*', '*'],
            method: 'get', // default
            controller: 'normalController'
        }
    ],
    angular: [ // Angular mod routes:
        {
            url: '/angular',
            controller: 'mainController'
        },
        {
            url: ['/', '/:lang', '/:lang/*', '*'],
            method: 'get',
            controller: 'angularController'
        }
    ],
    api: [ // Api mod routes:
        {
            url: '/api',
            controller: 'mainController'
        },
        {
            url: '*',
            method: 'get',
            controller: 'apiController'
        }
    ]
};
