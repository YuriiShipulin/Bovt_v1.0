var Order = require('../models/order');

module.exports = function () {

    this.getById = function (req, res, next) {
        var id = req.params.id;

        Order.findById(id, function (err, order) {

            if (err) {
                err.status = 400;
                err.message = 'Bad params: ' + id;

                return next(err)
            }

            if (order) {

                res.status(200).send(order);
            } else {

                res.status(403).send('No such order: ' + req.params.id);
            }
        });
    };

    this.create = function (req, res, next) {
        var order = new Order(req.body);

        order.save(function (err) {
            err.status = 400;
            err.message = 'Bad params: ';

            return next(err)
        });

        res.status(200).send('Order created: ' + order);
    };

    this.delete = function (req, res, next) {
        var id = req.params.id;

        Order.findByIdAndRemove(id, function (err) {
            if (err) {
                err.status = 400;
                err.message = 'Bad params: ' + id;

                return next(err)
            }

            res.status(200).send('Order: ' + req.params.id + " deleted");
        });
    };

    this.update = function (req, res, next) {
        var id = req.params.id;

        Order.findByIdAndUpdate(id, body, {new: true}, function (err) {
            if (err) {
                err.status = 400;
                err.message = 'Bad params: ' + id;

                return next(err)
            }

            res.status(200).send('Order: ' + req.params.id + " updated");
        });
    };

    this.getByIdWithItems = function (req, res, next) {
        var id = req.params.id;

        Order
            .findById(id, {__v: 0})
            .populate('items')
            .exec(function (err, order) {
                if (err) {

                    return next(err);
                }

                res.status(200).send(order);
            });
    };

    this.getTotalPrice = function (req, res, next) {
        var id = req.params.id;

        Order
            .findById(id, {__v: 0})
            .populate({
                path: 'items',
                select: {
                    price: 1
                }}).exec(function (err, result) {
            if (err) {
                return next(err);
            }

            var arr = result.items;
            var sum = 0;
            for (var i = 0; i < arr.length; i++) {
                sum += arr[i].price;
            }

            res.status(200).send({total_price : sum});
        });
    }
};

