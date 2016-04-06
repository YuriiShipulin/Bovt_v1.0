var express = require('express');
var router = express.Router();
var OrderHandler = require('../handlers/orderHandler');
var orderHandler = new OrderHandler();

router.get('/:id', orderHandler.getById);
router.post('/', orderHandler.create);
router.put('/:id', orderHandler.update);
router.delete('/:id', orderHandler.delete);
router.get('/:id/items', orderHandler.getByIdWithItems);
router.get('/:id/total', orderHandler.getTotalPrice);

module.exports = router;

