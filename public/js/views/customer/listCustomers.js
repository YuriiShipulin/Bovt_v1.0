
define([
    'backbone',
    'collections/customer',
    'underscore',
    'text!/templates/customer/tableTemplate.html',
    'text!/templates/customer/list.html'

], function(Backbone, Customers, _, tableTemplate, list){

    var View = Backbone.View.extend({

        el: '#content',

        template: _.template(tableTemplate),

        initialize : function(){
            var self = this;

            this.customersList = new Customers();

            this.customersList.fetch({reset: true});

            this.customersList.on('reset', function(){
                self.render();
            });
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