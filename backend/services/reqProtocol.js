// To get request protocol as a value (string) or false (boolean)
module.exports = function getProtocol(req) {
    if (!req) {
        return false;
    }

    let protocol = req.secure ? 'https' : 'http';

    protocol = req.headers['x-forwarded-proto'] || protocol;

    return protocol.split(/\s*,\s*/)[0];
};
