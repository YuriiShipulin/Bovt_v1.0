define([
    'backbone'
], function(Backbone){
    return Backbone.Router.extend({
        routes: {
            //'app/user': 'userRouter',
            'app/customer/create': 'createUser',
            'app/login': 'login',
            'app/:content' : 'contentRouter',
            '*any': 'defaultRouter'
        },

        createUser: function(){


            var self = this;

            require([
                'views/customer/create'
            ], function(CreateView){
                if(self.view){
                    self.view.undelegateEvents();
                }

                self.view = new CreateView();
                self.view.on('edit', function(){
                    console.log('got Event')
                });
            });
        },

        login: function(){
            var self = this;

            require([
                'views/login'
            ], function(Login){
                if(self.view){
                    self.view.undelegateEvents();
                }

                self.view = new Login();
            });
        },

        contentRouter: function(content){
            var self = this;
            var viewUrl = 'views/' + content + '/list';
            var collectionUrl = 'collections/' + content;

            function viewCreator(){
                var context = this;

                require([
                    viewUrl
                ], function(View){
                    if(self.view){
                        self.view.undelegateEvents();
                    }

                    self.view = new View({collection: context});
                });
            }

            require([
                collectionUrl
            ], function(Collection){
                var collection = new Collection();

                collection.fetch({reset: true});
                collection.on('reset', viewCreator, collection)
            });
        },

        userRouter: function(){
            console.log('inside user_router')
        },

        defaultRouter: function(){
            console.log('inside default_router')
        }

    })
});