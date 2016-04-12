var express = require('express');
var router = express.Router();
var CategoryHandler = require('../handlers/categoryHandler');
var categoryHandler = new CategoryHandler();

router.get('/', categoryHandler.list);
router.get('/:id', categoryHandler.findOneById); //useless
router.get('/:id/items', categoryHandler.findItemsById);
router.put('/:id', categoryHandler.update);
router.delete('/:id', categoryHandler.delete);
router.post('/', categoryHandler.create);

module.exports = router;

