
define([
    'backbone',
    'collections/category',
    'underscore',
    'text!/templates/category/categoryTemplate.htm'

], function(Backbone, Categories, _, categoryTemplate){

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(categoryTemplate),

        initialize : function(){
            this.render();
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

            this.collection.each(function(category){
                self.$el.append(self.template(category.toJSON()));
            });
        }
    });

    return View;
});
