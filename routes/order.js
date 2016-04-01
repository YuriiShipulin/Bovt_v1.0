
var orderHandler = require('../handlers/orderHandler');

module.exports = function(router){
    router.get('/:id', orderHandler.get);
    router.post('/create', orderHandler.create);
    router.put('/:id', orderHandler.update);
    router.delete('/:id', orderHandler.delete)
};
