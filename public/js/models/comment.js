define(['backbone'], function(Backbone) {

    var Comment = Backbone.Model.extend({
        idAttribute: '_id',

        urlRoot: function () {
            return '/comment/';
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

            this.on('change:text', function (model, error) {
                console.log('text is changed');
            });
        },

        defaults: {
            customer: '',
            item: '',
            text: '',
            date: Date.now
        }
    });

    return Comment;
});