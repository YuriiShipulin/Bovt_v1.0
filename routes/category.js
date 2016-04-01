var express = require('express');
var router = express.Router();
var CategoryHandler = require('../handlers/categoryHandler');
var categoryHandler = new CategoryHandler();

//done
router.get('/list', categoryHandler.list);
router.get('/:id', categoryHandler.findOneById);
router.put('/:id', categoryHandler.update);
router.delete('/:id', categoryHandler.delete);

router.post('/create', categoryHandler.create);

module.exports = router;

