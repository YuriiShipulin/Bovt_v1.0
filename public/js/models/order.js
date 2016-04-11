define(['backbone'], function (Backbone) {

    var Order = Backbone.Model.extend({
        idAttribute: '_id',

        urlRoot: function () {
            return '/order/';
        },

        validate: function (attrs) {

        },

        initialize: function (options) {

            this.on('invalid', function (model, error) {
                console.log('Invalid model ' + error);
            });

            this.on('change', function (model, error) {
                console.log('model changed');
            });

            this.on('change:name', function (model, error) {
                console.log('name is changed');
            });
        },

        defaults: {
            items: [],
            code: '',
            purchaseDate: Date.now,
            invoiceType: '',
            isPaid: false
        }
    });

    return Order;
});