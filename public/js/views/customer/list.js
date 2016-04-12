
define([
    'backbone',
    'collections/customer',
    'underscore',
    'text!/templates/customer/customerTemplate.htm'

], function(Backbone, Customers, _, customerTemplate){

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(customerTemplate),

        initialize : function(){
            var self = this;

            this.customersList = new Customers();

            this.customersList.fetch({reset: true});

            this.customersList.on('reset', function(){
                self.render();
            });
        },

        events: {
           'click div' : 'onDivClick'
        },

        onDivClick : function(e){
            e.stopPropagation();
            console.log('---click on customer img---');
        },

        render : function(){
            var self = this;

            this.customersList.each(function(customer){
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