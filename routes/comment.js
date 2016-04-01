
var commentHandler = require('../handlers/orderHandler');

module.exports = function(router){
    router.get('/:id', commentHandler.getById);
    router.post('/create', commentHandler.create);
    router.delete(':id', commentHandler.delete)
};
