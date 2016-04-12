
//var customer = new Customer({name: 'Roma', email: 'petya@mail.ru'}, {validate: false});

define(['views/customer/list', 'views/category/list'], function(Customers, Categories){
    function init(){
        console.log('< ==== initialize app ==== >');
        var customers = new Customers();
        var category = new Categories();
    }

    return {
        initialize: init
    }
});
