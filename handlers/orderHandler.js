var Order = require('../models/order');
var validator = require('validator');

module.exports = function () {

    this.getById = function (req, res, next) {
        var id = req.params.id;

        if (validator.isMongoId(id)) {
            Order.findById(id, function (err, order) {

                if (err) {
                    err.status = 400;
                    err.message = 'Bad params: ' + id;

                    return next(err)
                }

                if (order) {
                    res.status(200).send(order);
                } else {
                    res.status(400).send('No such order: ' + req.params.id);
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
        Order
            .find({}, {__v: 0})
            .lean()
            .exec(function (err, orders) {
                if (err) {
                    err.status = 403;
                    return next(err);
                }
                res.status(200).send(orders);
            });
    };

    this.create = function (req, res, next) {
        var errorMessage;
        var body = req.body;

        if (isNaN(body.code)) {
            errorMessage = 'Validation failed: ' + body.code + '\r\n';
        }

        if (!validator.isDate(body.purchaseDate)) {
            errorMessage = 'Validation failed: ' + body.purchaseDate + '\r\n';
        }

        if(errorMessage){
            var err = new Error(errorMessage);
            err.status = 400;

            return next(err);
        } else {

            var order = new Order(req.body);

            order.save(function (err) {
                err.status = 400;
                err.message = 'Bad params: ';

                return next(err)
            });

            res.status(200).send('Order created: ' + order);
        }
    };

    this.delete = function (req, res, next) {
        var id = req.params.id;

        if (validator.isMongoId(id)) {

            Order.findByIdAndRemove(id, function (err) {
                if (err) {
                    err.status = 400;
                    err.message = 'Bad params: ' + id;

                    return next(err)
                }

                res.status(200).send('Order: ' + req.params.id + " deleted");
            });
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed: ' + id;

            return next(err)
        }
    };

    this.update = function (req, res, next) {
        var errorMessage;
        var body = req.body;
        var id = req.params.id;

        if (!validator.isMongoId(id)) {
            errorMessage = 'Validation failed: ' + id + '\r\n';
        }

        if (body.code && isNaN(body.code)) {
            errorMessage = 'Validation failed: ' + body.code + '\r\n';
        }

        if (body.purchaseDate && !validator.isDate(body.purchaseDate)) {
            errorMessage = 'Validation failed: ' + body.purchaseDate + '\r\n';
        }

        if(errorMessage){
            var err = new Error(errorMessage);
            err.status = 400;

            return next(err);
        } else {
            Order.findByIdAndUpdate(id, body, {new: true}, function (err) {
                if (err) {
                    err.status = 400;
                    err.message = 'Bad params: ' + id;

                    return next(err)
                }

                res.status(200).send('Order: ' + req.params.id + " updated");
            });
        }
    };

    this.getByIdWithItems = function (req, res, next) {
        var id = req.params.id;

        if (validator.isMongoId(id)) {
            Order
                .findById(id, {__v: 0})
                .populate('items')
                .exec(function (err, order) {
                    if (err) {

                        return next(err);
                    }

                    res.status(200).send(order);
                });
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed: ' + id;

            return next(err)
        }
    };

    this.getTotalPrice = function (req, res, next) {
        var id = req.params.id;

        if (validator.isMongoId(id)) {
            Order
                .findById(id, {__v: 0})
                .populate({
                    path: 'items',
                    select: {
                        price: 1
                    }
                }).exec(function (err, result) {

                if (err) {
                    err.status = 400;
                    return next(err);
                }

                var arr = result.items;
                var sum = 0;
                for (var i = 0; i < arr.length; i++) {
                    sum += arr[i].price;
                }

                res.status(200).send({total_price: sum});
            });

        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed: ' + id;

            return next(err)
        }
    };
};

