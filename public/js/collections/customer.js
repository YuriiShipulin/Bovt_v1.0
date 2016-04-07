var Customers = Backbone.Collection.extend({
    model: Customer,
    url: '/user/',

    initialize: function (opt) {
        this.on('add', function () {
            console.log(':Added');
        });

        this.on('remove', function () {
            console.log(':Removed');
        });

        this.on('update', function () {
            console.log(':Updated');
        });

        this.on('reset', function(){
            console.log(':Reset')
        });

        this.fetch({
            reset : true,
            //type : 'GET',                         //req type
            //data: {a : 10, b : 20},               //query
            success: function(model, xhr, options){
                console.log('===== fetched =====')
            },

            error: function(model, xhr, options){
                console.log('fetch error')
            }
        })
    }
});
