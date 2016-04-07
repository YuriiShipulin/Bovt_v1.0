var Customer = Backbone.Model.extend({
    idAttribute: '_id',

    urlRoot: function () {
        return '/user/';
    },

    validate: function(attrs){
        if(attrs.age) {
            if (attrs.age < 18) {
                return 'invalid service for you'
            }
        }
    },

    initialize: function (options) {

        this.on('invalid', function(model, error){
            console.log('Invalid model ' + error);
        });

        this.on('change', function(model, error){
            console.log('model changed');
        });

        this.on('change:name', function(model, error){
            console.log('name is changed');
        });
    },

    defaults : {
        role: '0',
        orders: [],
        comments: [],
        name: '',
        surname: '',
        email: '',
        password: '',
        age: 23,
        phone: '',
        lastVisit: Date.now
    }
});

//var user = new Customer({name:'Roma', email : 'petya@mail.ru'}, {validate : false});