
//var customer = new Customer({name: 'Roma', email: 'petya@mail.ru'}, {validate: false});

define([
    'backbone',
/*    'views/customer/list',
    'views/category/list',*/
    'routes/router'], function(Backbone, Router){
    function init(){
        var router = new Router();
        Backbone.history.start();                     //TODO PUSH STATE // {silent:true => no default}


        //Backbone.history.navigate('#user', {trigger: true});      // same result but + history
        //Backbone.history.navigate('#user');                       // no trigger - no result
        //window.location.hash = '#user';                           // no history
    }

    return {
        initialize: init
    }
});
