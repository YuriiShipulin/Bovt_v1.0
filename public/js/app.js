
define([
    'backbone',
    'jQuery',
    'underscore',
    'routes/router'], function(Backbone, $, _, Router){
    function init(){
        var router = new Router();

        Backbone.history.start();

        /*APP.channel = _.extend({}, Backbone.Events);*/


        //Backbone.history.navigate('#user', {trigger: true});      // same result but + history
        //Backbone.history.navigate('#user');                       // no trigger - no result
        //window.location.hash = '#user';                           // no history
    }                                                               //TODO PUSH STATE // {silent:true => no default}

    return {
        initialize: init
    }
});
