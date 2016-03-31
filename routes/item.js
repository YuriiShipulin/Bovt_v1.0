
var itemHandler = require('../handlers/itemHandler');

module.exports = function(router){
    router.get('/product', itemHandler.renderItem);
    router.get('/product/get/:id', itemHandler.get);
    router.post('/product/create', itemHandler.create);
    router.put('/product/update/:id', itemHandler.update);
    router.delete('/product/delete/:id', itemHandler.delete)
};
