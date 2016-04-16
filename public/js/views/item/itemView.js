
define([
    'backbone',
    'models/item',
    'underscore',
    'text!/templates/item/itemTemplate.html'

], function(Backbone, Item, _, itemTemplate){

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(itemTemplate),

        events: {
            'click #editBtn': 'onEdit',
            'click #removeBtn': 'onRemove'
        },

        onEdit: function (e) {
            e.stopPropagation();
        },

        onRemove: function (e) {
            var model = this.model;

            e.stopPropagation();

            if (!model) {
                return false;
            }

            model.destroy({
                wait: true,
                success: function (model) {
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#app/item', {trigger: true});
                },

                error: function (model, xhr) {
                    alert(xhr.statusText);
                }
            });
        },

        initialize : function(){
            this.render();
        },

        render : function(){
            this.$el.html(this.template({collection: this.collection}));
        }
    });

    return View;
});
