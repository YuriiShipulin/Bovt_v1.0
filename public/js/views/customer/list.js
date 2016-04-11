
define([
    'backbone',
    'collections/customer',
    'underscore',
    'text!templates/customerTemplate.htm'

], function(Backbone, Customers, _, customerTemplate){

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(customerTemplate),

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
            var self = this;

            this.customesrList.each(function(customer){
                self.$el.append(self.template(customer.toJSON()));
            });

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