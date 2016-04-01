
var itemHandler = require('../handlers/itemHandler');

module.exports = function(router){
    router.get('/', itemHandler.renderItem);
    router.get('/:id', itemHandler.getById);
    router.post('/create', itemHandler.create);
    router.put('/:id', itemHandler.update);
    router.delete('/:id', itemHandler.delete)
};
