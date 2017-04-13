// NODE MODULES
const mongoose = require('mongoose');


mongoose.Promise = require('bluebird');


// To prevent displaying message about DeprecationWarning ---> https://github.com/Automattic/mongoose/issues/4291
module.exports = mongoose;
