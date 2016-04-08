var express = require('express');
var router = express.Router();
var CommentHandler = require('../handlers/commentHandler');
var commentHandler = new CommentHandler();


router.get('/:id', commentHandler.getById);
router.get('/', commentHandler.list);
router.post('/', commentHandler.create);
router.delete(':id', commentHandler.delete);

module.exports = router;
