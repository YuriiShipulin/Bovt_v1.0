/*
var User = require('./models/user').User;
var Customer = require('./models/customer').Customer;

var user = new User(0);
var customer = new Customer();
customer.userName = 'name';
customer.surname = 'surname';
customer.email = 'mail@mail';
customer.phone = '654654';
customer.age = 54;
customer.password = '24646498';

user.save(function(err, user, affected){
    console.log(arguments);
 });

customer.save(function(err, user, affected){
    console.log(arguments);

    Customer.findOne({userName : "name"}, function(err, customer){
        console.log('CALLBACK ' + customer);
    });
});
*/
