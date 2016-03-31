
var userHandler = require('../handlers/userHandler');

module.exports = function(router){

    //Done
    router.get('/signup', userHandler.renderSignup);
    router.get('/register', userHandler.renderRegister);
    router.post('/user/login', userHandler.login);
    router.post('/user/reg', userHandler.register);
    router.get('/user/list', userHandler.list);
    router.get('/user/get/:id', userHandler.get);

    router.put('/user/update/:id', userHandler.update);
    router.delete('/user/delete/:id', userHandler.delete)
};
