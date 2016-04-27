define([
    'backbone',
    'underscore',
    'text!templates/navbar.html'
], function (Backbone, _, navbar) {
    return Backbone.View.extend({
        el      : '#container',
        template: _.template(navbar),

        initialize: function (opt) {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }
    });
});