var Category = require('../models/category');

module.exports = function () {

    this.list = function (req, res, next) {
        Category
            .find({}, {__v: 0})
            .lean()
            .exec(function (err, categories) {
                if (err) {
                    err.status = 403;
                    return next(err);
                }
                res.status(200).send(categories);
            });
    };

    this.findOneById = function (req, res, next) {
        var id = req.params.id;

        Category.findOne({_id: id}, function (err, category) {
            if (err) {
                err.status = 400;
                return next(err);
            }
            if (category) {
                res.status(200).send(category);
            } else {
                res.status(403).send('No such category: ' + req.params.id);
            }
        });
    };

    this.create = function (req, res, next) {
        var category = new Category(req.body);

        category.save(function (err) {
            if (err) {
                err.status = 400;
                err.message = 'Bad params';
                return next(err)
            }

        });
        res.status(200).send(category.name + ' was created');
    };

    this.delete = function (req, res, next) {
        var id = req.params.id;

        Category.findByIdAndRemove(id, function (err) {
            if (err) {
                err.status = 400;
                err.message = 'Bad params: ' + id;

                return next(err)
            } else {
                res.status(200).send('Category: ' + id + " deleted");
            }
        });
    };

    this.update = function (req, res, next) {
        var id = req.body.params.id;
        var body = req.body;

        Category.findByIdAndUpdate(id, body, {new: true}, function (err) {
            if (!err) {
                res.status(400).send('Bad params');
            } else {
                res.status(200).send('Category: ' + id + " updated");
            }
        });
    };
};
