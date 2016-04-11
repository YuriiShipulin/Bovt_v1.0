var User = require('../models/user');
var Admin = require('../models/admin');
var Customer = require('../models/customer');
var Order = require('../models/order');
var validator = require('validator');
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

        if (validator.isMongoId(id)) {
            Customer
                .findById(id, {__v: 0})
                .populate('orders')
                .exec(function (err, customer) {
                    if (err) {
                        err.status = 403;
                        err.message = 'Bad params: ' + id;

                        return next(err);
                    }

                    res.status(200).send(customer);
                });

        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed: ' + id;

            return next(err)
        }
    };

    this.getById = function (req, res, next) {
        var id = req.params.id;

        if (validator.isMongoId(id)) {

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
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed: ' + id;

            return next(err)
        }
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
        var body = req.body;

        if (validator.isEmail(body.email)) {
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
                            res.status(200).send('authorized successfully')
                        } else {

                            res.status(403).send('Not authorized(Password)')
                        }
                    } else {

                        res.status(403).send('Not authorized(Login)');
                    }
                });
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed: ' + body.email;

            return next(err)
        }
    };

    this.create = function (req, res, next) {                           //VALIDATION TODO
        var body = req.body;
        var errorMessage;

        if(body.role){
            body.role = null;
        }

        if (body.name && !validator.isAlpha(body.name)) {
            errorMessage = 'Validation failed: ' + body.name + '\r\n';
        }

        if (body.surname && !validator.isAlpha(body.surname)) {
            errorMessage += 'Validation failed: ' + body.surname + '\r\n';
        }

        if (body.email && !validator.isEmail(body.email)) {
            errorMessage += 'Validation failed: ' + body.email + '\r\n';
        }

        if (body.age && (body.age < 12 || body.age > 99)) {
            errorMessage += 'Validation failed: user age must be between 12 & 100: ' + body.age + '\r\n';
        }

        if (errorMessage) {
            var err = new Error(errorMessage);
            err.status = 400;

            return next(err);
        } else {
            var customer = new Customer(body);
            customer.save(function (err, customer) {

                if (err) {
                    err.message = "WTF"; //TODO
                    err.status = 400;

                    return next(err);
                }
                req.session.customer = customer._id;
                res.status(200).send('CUSTOMER SAVED: ' + customer);
            });
        }
    };

    this.delete = function (req, res, next) {
        var id = req.params.id;

        if (validator.isMongoId(id)) {
            Customer.findByIdAndRemove(id, function (err) {
                if (err) {
                    err.status = 400;
                    err.message = 'Bad params';

                    return next(err);
                } else {
                    res.status(200).send('Customer: ' + id + " deleted");
                }
            })

        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed: ' + id;

            return next(err)
        }
    };

    this.update = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        var errorMessage;

        if(body.role){
            body.role = null;
        }

        if (!validator.isMongoId(id)) {
            errorMessage = 'Validation failed: ' + id + '\r\n';
        }

        if (body.name && !validator.isAlpha(body.name)) {
            errorMessage = 'Validation failed: ' + body.name + '\r\n';
        }

        if (body.surname && !validator.isAlpha(body.surname)) {
            errorMessage = 'Validation failed: ' + body.surname + '\r\n';
        }

        if (body.email && !validator.isEmail(body.email)) {
            errorMessage += 'Validation failed: ' + body.email + '\r\n';
        }

        if (body.age && (body.age < 12 || body.age > 99)) {
            errorMessage = 'Validation failed: user age must be between 12 & 100: ' + body.age + '\r\n';
        }

        if (errorMessage) {
            var err = new Error(errorMessage);
            err.status = 400;

            return next(err);
        } else {
            //body.image = image;
            Customer.findByIdAndUpdate(id, body, {new: true}, function (err) {
                if (err) {
                    err.status = 400;
                    err.message = 'Bad params';

                    return next(err)

                } else {
                    res.status(200).send('Customer: ' + id + " updated");
                }
            });
        }
    };

    this.uploadPicture = function (req, res, next) {

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

            form.parse(req);
        });
    };
};









