
define([
    'backbone',
    'models/customer',
    'underscore',
    'text!/templates/customer/list.html'

], function(Backbone, Customer, _, list){

    var View = Backbone.View.extend({

        el: '#content',

        template: _.template(list),

        initialize : function(){
            var self = this;

            this.customer = new Customer();

            this.customer.fetch({reset: true});

            this.customer.on('reset', function(){
                self.render();
            });
        },

        render : function(){
                this.$el.html(this.template(customer.toJSON()));
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