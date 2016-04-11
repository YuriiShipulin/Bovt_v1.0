define([
    'backbone',
    'models/item'], function (Backbone, Item) {

    var Items = Backbone.Collection.extend({
        model: Item,
        url: '/item/',

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
                    console.log('=====items fetched =====')
                },

                error: function (model, xhr, options) {
                    console.log('fetch error')
                }
            })
        }
    });

    return Items;
});

