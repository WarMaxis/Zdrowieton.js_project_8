// Routes - Here put all your route objects
module.exports = [
    {
        url: '/api/pomiar',
        controller: require('../controllers/pomiar')
    },
    {
        url: '/api/pomiary',
        controller: require('../controllers/pomiary')
    }
];
