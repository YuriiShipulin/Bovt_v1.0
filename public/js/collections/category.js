var Categories = Backbone.Collection.extend({
    model: Category,
    url: '/category/',

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
            success: function(model, xhr, options){
                console.log('===== category fetched =====')
            },

            error: function(model, xhr, options){
                console.log('fetch error')
            }
        })
    }
});
