var Item = require('../models/item');
var Customer = require('../models/customer');
var Category = require('../models/category');

module.exports = function () {
    this.renderItem = function (req, res, next) {
        res.send("product");
    };

    this.getById = function (req, res, next) {
        var id = req.params.id;

        Item
            .findById(id, function (err, item) {
                if (err) {
                    err.status = 400;
                    err.message = 'Bad params: ' + id;

                    return next(err)
                }

                if (item.length) {

                    res.status(200).send(item);
                } else {

                    res.status(403).send('No such item: ' + req.params.id);
                }
            });
    };

    this.create = function (req, res, next) {
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

        Item.findByIdAndRemove(id, function (err) {

            if (err) {
                err.status = 400;
                err.message = 'Bad params: ' + id;

                return next(err)
            }

            res.status(200).send('Item: ' + req.params.id + " deleted");
        });
    };

    this.update = function (req, res, next) {                     //TODO
        var id = req.params.id;
        var body = req.body;

        Item.findByIdAndRemove(id, body, {new: true}, function (err) {
            if (err) {
                err.status = 400;
                err.message = 'Bad params: ' + id;

                return next(err)
            }

            res.status(200).send('Item: ' + id + " updated");
        });
    };
};
