var Item = require('../models/item');
var Customer = require('../models/customer');
var Category = require('../models/category');
var validator = require('validator');

module.exports = function () {

    this.getById = function (req, res, next) {
        var id = req.params.id;

        if (validator.isMongoId(id)) {
            Item
                .findById(id, function (err, item) {
                    if (err) {
                        err.status = 400;
                        err.message = 'Bad params: ' + id;

                        return next(err)
                    }

                    if (item) {

                        res.status(200).send(item);
                    } else {

                        res.status(403).send('No such item: ' + req.params.id);
                    }
                });
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed:' + id;

            return next(err);
        }
    };

    this.list = function (req, res, next) {
        Item
            .find({}, {__v: 0})
            .lean()
            .exec(function (err, items) {
                if (err) {
                    err.status = 403;
                    return next(err);
                }
                res.status(200).send(items);
            });
    };

    this.create = function (req, res, next) {                   //TODO VALIDATION
        var item = new Item(req.body);

        item.save(function (err, item) {

            if (err) {
                err.status = 400;
                err.message = 'Bad params: ';

                return next(err)
            }
        });

        res.status(200).send('Item created: ' + item);
    };

    this.delete = function (req, res, next) {
        var id = req.params.id;

        if (validator.isMongoId(id)) {
            Item
                .findByIdAndRemove(id, function (err) {

                    if (err) {
                        err.status = 400;
                        err.message = 'Bad params: ' + id;

                        return next(err)
                    }

                    res.status(200).send('Item: ' + req.params.id + " deleted");
                });
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed:' + id;

            return next(err);
        }
    };

    this.update = function (req, res, next) {                     //TODO VALIDATION
        var id = req.params.id;
        var body;

        if (validator.isMongoId(id)) {
            body = req.body;
            Item
                .findByIdAndRemove(id, body, {new: true}, function (err) {
                    if (err) {
                        err.status = 400;
                        err.message = 'Bad params: ' + id;

                        return next(err)
                    }

                    res.status(200).send('Item: ' + id + " updated");
                });
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed:' + id;

            return next(err);
        }
    };
};
