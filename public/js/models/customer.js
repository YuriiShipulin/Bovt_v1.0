

var CustomerModel = Backbone.Model.extend({
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
    },

    idAttribute: '_id',
    urlRoot: '/user/'
});