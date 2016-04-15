define([
    'backbone'
], function (Backbone) {
    return Backbone.Router.extend({
        routes: {
            //'app/user': 'userRouter',
            'app': 'login',
            'app/:content': 'contentRouter',
            'app/customer/create': 'createUser',
            'app/customer/:id': 'fetchCustomer',
            'app/login': 'login',
            '*any': 'login'
        },

        login: function () {
            var self = this;

            require([
                'views/login'
            ], function (Login) {
                if (self.view) {
                    self.view.undelegateEvents();
                }

                self.view = new Login();
            });
        },

        fetchCustomer: function (id) {
            var self = this;
            var modelUrl = 'models/customer';
            var viewUrl = 'views/customer/customerView';


            require([
                modelUrl
            ], function (Model) {
                var model = new Model();
                model.set('_id', id);

                model.fetch({
                    success: function (model) {

                        require([
                            viewUrl
                        ], function (CreateView) {
                            if (self.view) {

                                self.view.undelegateEvents();
                            }

                            self.view = new CreateView({model: model});
                        });
                    }
                });
            });
        },

        createUser: function () {
            var self = this;

            require([
                'views/customer/create'
            ], function (CreateView) {
                if (self.view) {
                    self.view.undelegateEvents();
                }

                self.view = new CreateView();
            });
        },

        contentRouter: function (content) {
            var self = this;
            var viewUrl = 'views/' + content + '/list';
            var collectionUrl = 'collections/' + content;

            function viewCreator() {
                var context = this;

                require([
                    viewUrl
                ], function (View) {

                    if (self.view) {
                        self.view.undelegateEvents();
                    }

                    self.view = new View({collection: context});
                });
            }

            require([
                collectionUrl
            ], function (Collection) {
                var collection = new Collection();

                collection.fetch({reset: true});
                collection.on('reset', viewCreator, collection)
            });
        },

        userRouter: function () {
            console.log('inside user_router')
        },

        defaultRouter: function () {
            console.log('inside default_router')
        }

    })
});