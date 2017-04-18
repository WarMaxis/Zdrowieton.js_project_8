// ROUTES CONFIG
module.exports = {
    MODEL: {
        METHODS: [
            'get',
            'post',
            'put',
            'delete'
        ],
        DEFAULT_METHOD: 'get',
        DEFAULT_CONTROLLER: 'mainController'
    },
    DIRECTORY: {
        CONTROLLERS_DIR: '/controllers' // Controllers files directory
    }
};
