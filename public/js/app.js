
//var customer = new Customer({name: 'Roma', email: 'petya@mail.ru'}, {validate: false});

define(['views/customer/list'], function(Customers){
    function init(){
        console.log('---- initialize app ----');
        var customer = new Customers();
        console.log(customer);
    }


    return {
        initialize: init
    }
});

//users.fetch({reset: true}); //TRUE RESET