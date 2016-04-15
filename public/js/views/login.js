define([
    'backbone',
    'underscore',
    'models/customer',
    'text!templates/login.html'
], function (Backbone, _, Customer, login) {
    return Backbone.View.extend({
        el      : '#container',
        template: _.template(login),
        events  : {
            'click #logIn'  : 'onLogin',
            'click #signUp': 'onSignup'
        },

        initialize: function (opt) {
            this.render();
        },

        onLogin  : function (e) {
            var $thisEl = this.$el;
            var email;
            var password;

            e.stopPropagation();
            e.preventDefault();

            email = $thisEl.find('#email').val();
            password = $thisEl.find('#password').val();



            this.model = new Customer({
                email: email,
                password: password
            });

            this.model.urlRoot = '/user/login';

            this.model.save(null, {
                wait: true,

                validate: false,

                success: function(model){
                    console.log('SUCCESS LOGIN [' + model.id + ']');
                    Backbone.history.navigate('#app/customer', {trigger: true});
                },

                error: function(model, xhr){
                    alert(xhr.statusText);
                }
            });
        },

        onSignup: function (e) {

            Backbone.history.navigate('#app/customer/create', {trigger: true});
        },

        render: function () {
            this.$el.html(this.template());
        }
    });
});