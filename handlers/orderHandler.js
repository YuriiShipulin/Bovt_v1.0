var Order = require('../models/order');

var handler = {
    get: function (req, res, next) {
        Order.find({_id: req.params.id}, function (err, order) {

            if (err) return next(err);

            if (order.length) {
                res.status(200).send(order);
            } else {
                res.status(403).send('No such order: ' + req.params.id);
            }
        });
    },

    create: function (req, res, next) {
        var order = new Order(req.body);

        order.save(function (err, order) {

            if (err) return next(err);
            //console.log(order);
        });

        res.status(200).send('Order created: ' + order);
    },

    delete: function (req, res, next) {
        Order.remove({_id: req.params.id}, function (err) {
            if (err) return next(err);

            res.status(200).send('Order: ' + req.params.id + " deleted");
        });
    },

    update: function (req, res, next) {
        res.send('order updating...');
    }
};

module.exports = handler;