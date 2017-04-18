// HTTP CODES CONFIG
module.exports = {
    SUCCESS: 200, // Default status code for all successful response of pages or resource without property 'statusCode'.
    REDIRECT: {
        PERMANENT: 301, // Default status code for all redirect pages without property 'statusCode'.
        TEMPORARY: 302 // Default status code for all error handler redirects.
    },
    SUPPORTED_ERRORS: [ // All supported errors need to be defined in pages.config.js and have his own configuration object.
        500, // First element is default variable - Is returned in all otherwise cases of error, which hasn't defined.
        404
    ]
};
