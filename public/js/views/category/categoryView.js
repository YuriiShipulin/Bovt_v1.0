define([
    'backbone',
    'models/category',
    'underscore',
    'text!/templates/category/categoryTemplate.html'

], function(Backbone, Category, _, categoryTemplate){

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(categoryTemplate),

        events: {
            'click #editBtn': 'onEdit',
            'click #removeBtn': 'onRemove',
            'click #productsBtn': 'onItems'
        },

        onEdit: function (e) {
            e.stopPropagation();
        },


        onItems: function (e) {
            var id = this.model.id;

            Backbone.history.navigate('#app/category/' + id + '/items', {trigger: true});

           /*var id = this.model.id;
            this.model = new Category();
            e.stopPropagation();
            this.model.urlRoot = 'category/' + id + '/items';
            this.model.fetch({
                wait: true,
                success: function (model) {
                    console.log(model);
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#app/category', {trigger: true});
                },
                error: function (model, xhr) {
                    console.log(model);
                    alert(xhr.statusText);
                }
            });*/
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
                    Backbone.history.navigate('#app/category', {trigger: true});
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
            this.$el.html(this.template({model: this.model}));
        }
    });

    return View;
});
