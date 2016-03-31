var express = require('express');
var router = express.Router();
require('./user')(router);
require('./category')(router);
require('./item')(router);
require('./order')(router);

var homeHandler = require('../handlers/homeHandler');

router.use('/', homeHandler);

module.exports = router;
