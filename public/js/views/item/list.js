define([
    'backbone',
    'collections/item',
    'underscore',
    'text!/templates/item/list.html'

], function (Backbone, Items, _, list) {

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(list),

        initialize: function () {
            this.render();
        },

        events: {
            'click #createBtn': 'onCreate',
            'click #editBtn': 'onEdit',
            'click #removeBtn': 'onRemove',
            'click img': 'onItem'
        },

        onItem: function(e){
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var id = $tr.attr('id');

            e.stopPropagation();
            Backbone.history.navigate('#app/item/' + id, {trigger: true});
        },

        onCreate: function (e) {
            e.stopPropagation();
            Backbone.history.navigate('#app/item/create', {trigger: true});
        },

        onEdit: function (e) {
            e.stopPropagation();
        },

        onRemove: function (e) {
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var id = $tr.attr('id');
            var model = this.collection.get(id);

            e.stopPropagation();

            if (!model) {
                return false;
            }

            model.destroy({
                wait: true,
                success: function (model) {
                    console.log('---- Removed ' + model.id + ' ----');
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#app/item', {trigger: true});
                },
                error: function (model, xhr) {
                    alert(xhr.statusText);
                }
            });
        },


        render: function () {
            this.$el.html(this.template({collection: this.collection}));
        }
    });

    return View;
});

