define([
    'backbone'
], function (Backbone) {
    return Backbone.Router.extend({
        routes: {
            'app': 'navigationBar',
            'app/login': 'login',
            'app/:content(/p=:page)(/c=:count)': 'contentRouter',

            'app/customer/create': 'createUser',
            'app/customer/:id': 'fetchCustomer',

            'app/category/create': 'createCategory',
            'app/category/:id': 'fetchCategory',
            'app/category/:id/items': 'fetchCategoryItems',

            'app/item/create': 'createItem',
            'app/item/:id': 'fetchItem',

            '*any': 'default'
        },

        initialize : function(options){
        },

        default : function(){
            console.log("INSIDE DAFAULT");
            Backbone.history.navigate('#app', {trigger: true});
        },

        navigationBar : function(){
            var self = this;

            require([
                'views/navigationBar'
            ], function (NavigationBar) {
                if (self.view) {
                    self.view.undelegateEvents();
                }

                self.view = new NavigationBar();
            });
        },

        fetchItem: function(id){
            var self = this;
            var modelUrl = 'models/item';
            var viewUrl = 'views/item/itemView';

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

        fetchCategoryItems: function(id){               //TODO Item templates & views & WTF is wrong wth view+collection
            var self = this;

            var modelUrl = 'models/category';
            var viewUrl = 'views/item/list';

            require([
                modelUrl
            ], function (Model) {
                var model = new Model();
                model.urlRoot = 'category/' + id + '/items';

                model.fetch({
                    success: function (items) {
                        require([
                            viewUrl
                        ], function (CreateView) {
                            if (self.view) {
                                self.collectoin = items;

                                self.view.undelegateEvents();
                            }

                            console.dir('CAL' + items);
                            self.view = new CreateView({collection: self.collection});
                        });
                    }
                });
            });
        },

        createCategory: function(){
            var self = this;

            require([
                'views/category/create'
            ], function (CreateView) {
                if (self.view) {
                    self.view.undelegateEvents();
                }

                self.view = new CreateView();
            });
        },

        fetchCategory: function(id){
            var self = this;
            var modelUrl = 'models/category';
            var viewUrl = 'views/category/categoryView';

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

        contentRouter: function (content, page, count) {
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
                var collection;

                page = page || 1;
                count  = count || 10;

                collection = new Collection();

                //TODO: lookup at romashka code and decode what to to
                collection.fetch({
                    reset: true,

                    data: {
                        page : page,
                        count : count
                    }
                });

                collection.on('reset', viewCreator, collection)
            });
        }
        //TODO NEXT
    })
});