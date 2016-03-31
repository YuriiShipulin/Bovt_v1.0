
var commentHandler = require('../handlers/orderHandler');

module.exports = function(router){
    router.get('comment/get/:id', commentHandler.get);
    router.post('comment/create', commentHandler.create);
    router.delete('comment/delete/:id', commentHandler.delete)
};
