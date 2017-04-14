/* eslint no-console: 0 */


// Helpers - Function: createServer( { app: <Any HTTP module which providing function listen(port, host)> , port: <Number> , host: <String> } ) or arguments in the same order as object properties.
module.exports = function createServer(app, port, host, ...args) {
    if (arguments.length === 0) {
        return false;
    }

    if (arguments.length === 1 && typeof app === 'object') {
        args = app;

        app = args.app;
        port = args.port;
        host = args.host;
    }

    if (typeof app !== 'function' || typeof app.listen !== 'function' || typeof port !== 'number' || typeof host !== 'string') {
        return false;
    }

    return app.listen(port, host, () => {
        console.log('\x1b[34m%s\x1b[0m', '[Restful API]', `Listening on address: http://${host}:${port}`);
    });
};
