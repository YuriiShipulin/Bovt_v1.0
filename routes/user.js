var express = require('express');
var router = express.Router();
var UserHandler = require('../handlers/userHandler');
var userHandler = new UserHandler();

router.get('/signup', userHandler.renderSignup);
router.get('/register', userHandler.renderRegister);
router.post('/login', userHandler.login);
router.post('/reg', userHandler.register);
router.get('/list', userHandler.list);
router.get('/:id', userHandler.getById);
router.get('/:id/orders', userHandler.getByIdWithOrders);
router.put('/:id', userHandler.update);
router.delete('/:id', userHandler.delete);

module.exports = router;
