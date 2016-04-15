
define([
    'backbone',
    'models/customer',
    'underscore',
    'text!/templates/customer/customerTemplate.html'

], function(Backbone, Customer, _, customerTemplate){

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(customerTemplate),

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
                    Backbone.history.navigate('#app/customer', {trigger: true});
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
