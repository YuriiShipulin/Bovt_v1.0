
var categoryHandler = require('../handlers/categoryHandler');

module.exports = function(router){
    //done
    router.get('/category', categoryHandler.renderCategory);
    router.get('/category/get/:id', categoryHandler.get);
    router.get('/category/getAll', categoryHandler.getAll);

    router.post('/category/create', categoryHandler.create);
    router.put('/category/update/:id', categoryHandler.update);
    router.delete('/category/delete/:id', categoryHandler.delete)
};
