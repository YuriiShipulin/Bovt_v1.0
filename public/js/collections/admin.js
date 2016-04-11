define([
    'backbone',
    'models/admin'], function(Backbone, Admin) {

    var Admins = Backbone.Collection.extend({
        model: Admin,
        url: '/admin/',

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

            this.fetch({
                reset: true,
                success: function (model, xhr, options) {
                    console.log('===== admins fetched =====')
                },

                error: function (model, xhr, options) {
                    console.log('fetch error')
                }
            })
        }
    });

    return Admins;
});

