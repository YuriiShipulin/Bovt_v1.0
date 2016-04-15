define([
    'backbone',
    'collections/category',
    'underscore',
    'text!/templates/category/list.html'

], function (Backbone, Categories, _, list) {

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(list),

        initialize: function () {
            this.render();
        },

        events: {
            'click #createBtn': 'onCreate',                 //TODO
            'click #editBtn': 'onEdit',                     //TODO
            'click #removeBtn': 'onRemove',
            'click img': 'onCategory'
        },

        onCategory: function(e){
            var $target = $(e.target);
            var $tr = $target.closest('tr');                //TODO
            var id = $tr.attr('id');

            e.stopPropagation();
            Backbone.history.navigate('#app/category/' + id, {trigger: true});
        },

        onCreate: function (e) {
            e.stopPropagation();
            Backbone.history.navigate('#app/category/create', {trigger: true});
        },

        onEdit: function (e) {
            e.stopPropagation();
        },

        onRemove: function (e) {
            var $target = $(e.target);
            var $tr = $target.closest('tr');                //TODO
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
                    Backbone.history.navigate('#app/category', {trigger: true});
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
