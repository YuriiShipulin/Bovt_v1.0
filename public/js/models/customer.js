

var CustomerModel = Backbone.Model.extend({
    defaults : {
        role: '',
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