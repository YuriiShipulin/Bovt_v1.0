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
        role: '',
        orders: [],
        comments: [],
        name: '',
        surname: '',
        email: '',
        password: '',
        age: '',
        phone: '',
        lastVisit: Date.now
    }
});

 var user = new UserModel({name:'Ivan', age: '21'});

user.on('invalid', function(model, error){
    console.log('invalid model: ' + error);
});

