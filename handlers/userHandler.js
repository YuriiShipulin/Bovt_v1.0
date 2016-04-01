var User = require('../models/user');
var Admin = require('../models/admin');
var Customer = require('../models/customer');
var Order = require('../models/order');
var validator = require('validator');

module.exports = function () {

    this.renderSignup = function (req, res, next) {
        res.render('signup');
    };

    this.renderRegister = function (req, res, next) {
        res.render('register');
    };

    this.getByIdWithOrders = function (req, res, next) {
        var id = req.params.id;
        Customer
            .findById(id, {__v: 0})
            .populate('orders')
            .exec(function (err, customer) {
                if (err) {

                    return next(err);
                }

                res.status(200).send(customer);
            });
    };

    this.getById = function (req, res, next) {
        var id = req.params.id;

        Customer.findById(id, function (err, customer) {
            if (err) {
                err.status = 400;
                err.message = 'Bad params: ' + id;
                return next(err);
            }
            if (customer) {
                res.status(200).send(customer);
            } else {
                res.status(403).send('No such customer: ' + req.params.id);
            }
        });
    };

    this.list = function (req, res, next) {
        Customer
            .find({}, {role: 0, __v: 0})
            .lean()
            .exec(function (err, customers) {
                if (err) {
                    err.status = 400;

                    return next(err);
                }
                res.status(200).send(customers);
            });
    };

    this.login = function (req, res, next) {
        var body = req.body || null;
        if (body) {
            var email = body.email;
            var pass = body.password;

            Customer
                .findOne({email: email}, function (err, customer) {
                    if (err) {
                        err.status = 400;
                        err.message = 'Bad params: ' + email;

                        return next(err);
                    }

                    if (customer) {
                        if (customer.checkPassword(pass)) {
                            req.session.customer = customer._id;
                            res.status(200).send('authorized succesfully')
                        } else {

                            res.status(403).send('Not authorized(Password)')
                        }
                    } else {

                        res.status(403).send('Not authorized(Login)');
                    }
                });
        }
    };

    this.register = function (req, res, next) {
        var customer = new Customer(req.body);
        customer.save(function (err, customer) {

            if (err) return next(err);

            console.log(customer);
        });

        req.session.customer = customer._id;

        res.status(200).send('CUSTOMER SAVED: ' + customer);
    };

    this.delete = function (req, res, next) {
        var id = req.params.id;

        Customer.findByIdAndRemove(id, function (err) {
            if (err) {
                err.status = 400;
                err.message = 'Bad params';

                return next(err);
            } else {
                res.status(200).send('Customer: ' + id + " deleted");
            }
        });
    };

    this.update = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;

        Customer.findByIdAndUpdate(id, body, {new: true}, function (err) {
            if (err) {
                err.status = 400;
                err.message = 'Bad params';

                return next(err)
            } else {
                res.status(200).send('Customer: ' + id + " updated");
            }
        });
    };
};


