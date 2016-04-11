define([
    'backbone',
    'models/user'], function (Backbone, User) {

    var Users = Backbone.Collection.extend({
        model: User,
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

            this.fetch({
                reset: true,
                success: function (model, xhr, options) {
                    console.log('===== users fetched =====')
                },

                error: function (model, xhr, options) {
                    console.log('fetch error')
                }
            })
        }
    });

    return Users;
});

