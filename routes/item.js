var express = require('express');
var router = express.Router();
var ItemHandler = require('../handlers/itemHandler');
var itemHandler = new ItemHandler();

router.get('/', itemHandler.renderItem);
router.get('/:id', itemHandler.getById);
router.post('/create', itemHandler.create);
router.put('/:id', itemHandler.update);
router.delete('/:id', itemHandler.delete);

module.exports = router;
