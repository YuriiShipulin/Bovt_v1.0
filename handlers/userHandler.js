var User = require('../models/user');
var Admin = require('../models/admin');
var Customer = require('../models/customer');
//var mongoose = require('../helpers/mongoose'), Schema = mongoose.Schema;

var handler = {
    renderSignup: function (req, res, next) {
        res.render('signup');
    },

    renderRegister: function(req, res, next) {
        res.render('register');
    },

    get: function (req, res, next) {
        Customer.find({name : req.params.id}, function (err, customer) {
            if (err) return next(err);

            if (customer.length) {
                res.status(200).send(customer);
            } else {
                res.status(403).send('No such customer: ' + req.params.id);
            }
        });
    },

    login: function (req, res, next) {
        var body = req.body || null;
        if (body) {
            var email = body.email;
            var pass = body.password;

            Customer.findOne({email: email}, function (err, customer) {
                if(err) return next(err);

                if (customer) {
                    if (customer.checkPassword(pass)) {

                        res.status(200).send('Ok')
                    } else {

                        res.status(403).send('Not authorized(Password)')
                    }
                } else {

                    res.status(403).send('Not authorized(Login)');
                }
            });
        }
    },

    register: function (req, res, next) {
        var customer = new Customer(req.body);
        customer.save(function (err, customer) {
            if (err) return next(err);

            console.log(customer);
        });

        req.session.customer = customer._id;

        res.status(200).send('CUSTOMER SAVED: ' + customer);
    },

    delete: function (req, res, next) {
        Customer.remove({_id : req.params.id}, function (err) {
            if (err) return next(err);

            res.status(200).send('Customer: ' + req.params.id + " deleted");
        });
    },

    list: function (req, res, next) {
        Customer.find({}, function (err, customers) {
            if(err) return next(err);

            if(customers) {
                res.status(200).send(customers);
            }
        });
    },

    update: function (req, res, next) {                 //TODO
        res.send('user updating...');
        //next();
    }
};

module.exports = handler;


