var process = require('../config/development');
var mongoose = require('mongoose');
var env = process.env;

mongoose.connect(env.DB_HOST, env.DB_NAME, env.DB_PORT);

module.exports = mongoose;

