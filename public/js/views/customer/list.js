define([
    'backbone',
    'collections/customer'
], function(Backbone, Customers){
    var View = Backbone.View.extend({

        el: '#container',

        initialize : function(){
            var self = this;

            this.customesrList = new Customers();

            this.customesrList.fetch({
                reset: true,
                success: function (model, xhr, options) {
                    self.render();
                    console.log('===== users fetched =====')
                },

                error: function (model, xhr, options) {
                    console.log('fetch error')
                }
            });

        },

        render : function(){
            console.dir(this.customesrList);

            this.$el.html(JSON.stringify(this.customesrList));
        }
       /* tagName: 'ul',
        className: 'my-class',
        id: 'temp',
        attributes: {
            'data-name': 'temp'
        }*/
    });

    return View;
});