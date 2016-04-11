define([
    'backbone',
    'models/customer'], function(Backbone, Customer) {

    var Customers = Backbone.Collection.extend({
        model: Customer,
        url: '/user/',

        initialize: function (opt) {
            this.on('add', function () {
                console.log(':Added');
            });

            this.on('remove', function () {
                console.log(':Removed');
            });

            this.on('update', function () {
                console.log(':Updated');
            });

            this.on('reset', function () {
                console.log(':Reset')
            });
        }
    });

    return Customers;
});
