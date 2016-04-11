define([
    'backbone',
    'models/order'], function (Backbone, Order) {

    var Orders = Backbone.Collection.extend({
        model: Order,
        url: '/order/',

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

            //remove from init block
            this.fetch({
                reset: true,
                success: function (model, xhr, options) {
                    console.log('===== orders fetched =====')
                },

                error: function (model, xhr, options) {
                    console.log('fetch error')
                }
            })
        }
    });

    return Orders;
});

