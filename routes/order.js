
var orderHandler = require('../handlers/orderHandler');

module.exports = function(router){
    router.get('/user/order/:id', orderHandler.get);
    router.post('/user/order/create', orderHandler.create);
    router.put('/user/order/update/:id', orderHandler.update);
    router.delete('/user/order/delete/:id', orderHandler.delete)
};
