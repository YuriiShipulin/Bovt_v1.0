define([
    'backbone',
    'collections/customer',
    'underscore',
    'text!/templates/customer/list.html'

], function (Backbone, Customers, _, list) {

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(list),

        initialize: function () {
            this.render();
        },

        events: {
            'click #createBtn': 'onCreate',
            'click #editBtn': 'onEdit',
            'click #removeBtn': 'onRemove'
        },

        onCreate: function (e) {
            e.stopPropagation();
            Backbone.history.navigate('#app/customer/create', {trigger: true});
        },

        onEdit: function (e) {
            e.stopPropagation();
        },

        onRemove: function (e) {
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var userId = $tr.attr('id');
            var model = this.collection.get(userId);

            e.stopPropagation();

            if (!model) {
                return false;
            }

            model.destroy({
                wait: true,
                success: function (model) {
                    console.log('---- Removed ' + model.id + ' ----');
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#app/customer', {trigger: true});
                },
                error: function (model, xhr) {
                    alert(xhr.statusText);
                }
            });
        },


        render: function () {
            this.$el.html(this.template({collection: this.collection.models}));
        }
    });

    return View;
});

/* tagName: 'ul',
 className: 'my-class',
 id: 'temp',
 attributes: {
 'data-name': 'temp'
 }*/