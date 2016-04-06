var User = require('../models/user');
var Admin = require('../models/admin');
var Customer = require('../models/customer');
var Order = require('../models/order');
//var validator = require('validator');
var multiparty = require('multiparty');
var fs = require('fs');

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

    this.create = function (req, res, next) {
        var body = req.body;

        var customer = new Customer(body);
        customer.save(function (err, customer) {

            if (err) {
                return next(err);
            }
            req.session.customer = customer._id;

            res.status(200).send('CUSTOMER SAVED: ' + customer);
        });


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

        //Samples for testing
        body.image = image;
        body.orders = '';
        //

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


    this.uploadPicture = function (req, res, next) {

        console.log('inside pucuploading');
        var form = new multiparty.Form();
        var uploadFile = {uploadPath: '', type: '', size: ''};
        var maxSize = 1024 * 1024;
        var supportedTypes = ['image/jpg', 'image/png', 'image/jpeg'];
        var errors = [];

        form.on('error', function (err) {
            if (fs.existsSync(uploadFile.path)) {
                fs.unlinkSync(uploadFile.path);
            }
        });

        form.on('close', function () {
            if (errors.length == 0) {
                req.body.image = uploadFile.path;
                next();
            }

            else {
                if (fs.existsSync(uploadFile.path)) {
                    fs.unlinkSync(uploadFile.path);
                }
                next();
            }
        });

        form.on('part', function (part) {
            uploadFile.size = part.byteCount;
            uploadFile.type = part.headers['content-type'];
            uploadFile.path = './public/images/profile_pics/' + part.filename;

            if (uploadFile.size > maxSize) {
                errors.push('File size is ' + uploadFile.size + '. Limit is' + (maxSize / 1024 / 1024) + ' Mb.');
            }

            if (supportedTypes.indexOf(uploadFile.type) == -1) {
                errors.push('Unsupported type ' + uploadFile.type);
            }

            if (errors.length == 0) {
                var out = fs.createWriteStream(uploadFile.path);
                part.pipe(out);
            }
            else {
                part.resume();
            }
        });

        form.parse(req);
    };
};


