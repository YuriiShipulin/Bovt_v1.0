var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname.split('\\').slice(0, -1).join('\\'), 'index_.html'));
});

module.exports = router;
