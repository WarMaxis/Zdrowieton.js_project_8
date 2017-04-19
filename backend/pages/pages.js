// Pages - All types of pages need to be defined in this array. Always required object properties: name, url and fileName in some cases statusCode, type, root and redirect are required.
module.exports = [
    { // Example page type:  main ---> Remember to create all new pages according to below examples of all available types of pages.
        name: 'main page',
        url: '/home', // Pattern ---> /^\/{1}[a-z0-9-_]{1,24}$/
        fileName: 'index',
        type: 'main',
        root: '/assets'
    },
    { // Example page type: normal
        name: 'dashboard page',
        url: '/dashboard',
        fileName: 'dashboard'
    },
    { // Example page type: 404
        name: '404 page',
        url: '/404',
        statusCode: 404,
        fileName: '404',
        type: '404'
    },
    { // Example page type: 500
        name: '500 page',
        url: '/500',
        statusCode: 500,
        fileName: '500',
        type: '500'
    },
    { // Example page type: redirect
        name: 'redirect',
        url: '/redirect',
        fileName: 'redirect', // Atm needed
        type: 'redirect',
        redirect: {
            name: 'dashboard page'
        }
    }
];
