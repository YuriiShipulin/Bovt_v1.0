UserModel = Backbone.Model.extend({
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

var user = new UserModel({name:'Petya', age: '23', email : 'petya@mail.ru'}, {validate : false});


