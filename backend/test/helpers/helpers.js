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
    MODES_ARRAY: [ // Array with all available modes - Used in test/routes/routes.js
        'normal',
        'angular',
        'api'
    ],
    PAGE_MODEL: { // Used in test/models/page.js
        EXAMPLE_DATA: {
            name: 'test',
            url: '/test',
            fileName: 'test'
        },
        EQUAL_PAGE: {
            name: 'test',
            url: '/test',
            statusCode: 200,
            fileName: 'test',
            type: 'normal',
            redirect: {
                statusCode: 301,
                type: 'name',
                name: 'main page',
                url: '/home'
            },
            root: '/assets/pages'
        },
        RANDOM_EQUAL_PAGE: {
            name: '404 page',
            url: '/404',
            statusCode: 404,
            fileName: '404',
            type: '404',
            redirect: {
                statusCode: 404,
                type: 'url',
                name: '404 page',
                url: '/404'
            },
            root: '/assets'
        }
    },
    ROUTE_MODEL: { // Used in test/models/route.js
        EXAMPLE_DATA: {
            url: '/test'
        },
        EQUAL_ROUTE: {
            url: '/test',
            method: 'get',
            controller: 'mainController'
        },
        RANDOM_EQUAL_ROUTE: {
            url: '/login',
            method: 'post',
            controller: 'loginController'
        }
    }
};
