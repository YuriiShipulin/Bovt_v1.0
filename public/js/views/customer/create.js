define([
    'backbone',
    'models/customer',
    'underscore',
    'text!/templates/customer/create.html'
], function (Backbone, Customer, _, create) {

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(create),

        events: {
            'click #saveBtn': 'onSave',
            'click #cancelBtn': 'onCancel'
        },

        onSave: function (e) {
            var $thisEl = this.$el;
            var name;
            var age;
            var surname;
            var email;
            var phone;
            var password;
            var confirmPassword;


            e.stopPropagation();
            e.preventDefault();

            name = $thisEl.find('#name').val();
            age = $thisEl.find('#age').val();
            surname = $thisEl.find('#surname').val();
            email = $thisEl.find('#email').val();
            phone = $thisEl.find('#phone').val();
            password = $thisEl.find('#password').val();
            confirmPassword = $thisEl.find('#confirmPassword').val();

            if(password !== confirmPassword) {
                alert('passwords do not match');

                return;
            }

            this.customer = new Customer({
                name: name,
                age: age,
                surname: surname,
                email: email,
                phone: phone,
                password: password
            });

            this.customer.save(null, {
                wait: true,
                success: function (customer) {
                    console.log('SAVED ' + customer + ' SAVED');
                    Backbone.history.navigate('#app/customer', {trigger: true});
                },

                error: function (error) {
                    error.status = 401;
                    console.log('ERROR ' + error.status + ' NOT SAVED');
                    Backbone.history.navigate('#app/customer', {trigger: true});
                }
            })
        },

        onCancel: function(e){
            Backbone.history.navigate('#app/customer', {trigger: true});
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

    return View;
});

