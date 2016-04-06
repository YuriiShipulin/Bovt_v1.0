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
        if (validator.isMongoId(id)) {
            Category
                .findOne({_id: id}, function (err, category) {
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
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed:' + id;

            return next(err);
        }
    };

    this.create = function (req, res, next) {       //TODO VALIDATION
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

        if (validator.isMongoId(id)) {

            Category
                .findByIdAndRemove(id, function (err) {
                if (err) {
                    err.status = 400;
                    err.message = 'Bad params: ' + id;

                    return next(err)
                } else {
                    res.status(200).send('Category: ' + id + " deleted");
                }
            });
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed:' + id;

            return next(err);
        }
    };

    this.update = function (req, res, next) {       //TODO VALID
        var id = req.body.params.id;
        var body;

        if (validator.isMongoId(id)) {
            body = req.body;
            Category
                .findByIdAndUpdate(id, body, {new: true}, function (err) {
                if (!err) {
                    res.status(400).send('Bad params');
                } else {
                    res.status(200).send('Category: ' + id + " updated");
                }
            });
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed:' + id;

            return next(err);
        }
    };
};
