
define([
    'backbone',
    'collections/category',
    'underscore',
    'text!/templates/category/categoryTemplate.htm'

], function(Backbone, Categories, _, categoryTemplate){

    var View = Backbone.View.extend({

        el: '#container_2',

        template: _.template(categoryTemplate),

        initialize : function(){
            var self = this;

            this.categories = new Categories();

            this.categories.fetch({reset: true});

            this.categories.on('reset', function(){
                self.render();
            });
        },

        events: {
            'click div' : 'onDivClick'
        },

        onDivClick : function(e){
            e.stopPropagation();
            console.log('---click on category img---');
        },

        render : function(){
            var self = this;

            this.categories.each(function(category){
                self.$el.append(self.template(category.toJSON()));
            });
        }
    });

    return View;
});
