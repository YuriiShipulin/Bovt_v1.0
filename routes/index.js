var express = require('express');
var router = express.Router();

var categoryRouter = require('./category');
var itemRouter = require('./item');
var commentRouter = require('./comment');
var orderRouter = require('./order');
var userRouter = require('./user');
var homeHandler = require('../handlers/homeHandler');

router.use('/', homeHandler);
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/comment', commentRouter);
router.use('/item', itemRouter);
router.use('/order', orderRouter);

module.exports = router;
