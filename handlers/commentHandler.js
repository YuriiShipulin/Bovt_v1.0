var Comment = require('../models/comment');
var Customer = require('../models/customer');
var Item = require('../models/item');

module.exports = function () {
    this.getById = function (req, res, next) {
        var id = req.params.id;

        if (validator.isMongoId(id)) {
            Comment
                .findById(id, function (err, comment) {

                    if (err) {
                        err.status = 400;
                        err.message = 'Bad params: ' + id;

                        return next(err)
                    }

                    if (comment.length) {

                        res.status(200).send(comment);
                    } else {

                        res.status(403).send('No such comment: ' + req.params.id);
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
        Comment
            .find({}, {__v: 0})
            .lean()
            .exec(function (err, comments) {
                if (err) {
                    err.status = 403;
                    return next(err);
                }
                res.status(200).send(comments);
            });
    };

    this.create = function (req, res, next) {                   //TODO VALIDATION

        if(req.body.text.length > 120){
            var err = new Error('invalid message length ( > 120)');
            err.status = 400;

            return next(err);
        }

        var comment = new Comment(req.body);
        comment.save(function (err) {

            if (err) return next(err);
        });
        res.status(200).send('Comment created: ' + comment);
    };

    this.delete = function (req, res, next) {
        var id = req.params.id;
        if (validator.isMongoId(id)) {
            Comment
                .findByIdAndRemove(id, function (err) {
                    if (err) {
                        err.status = 400;
                        err.message = 'Bad params: ' + id;

                        return next(err)
                    }
                    res.status(200).send('Comment: ' + req.params.id + " deleted");
                });
        } else {
            var err = new Error();
            err.status = 400;
            err.message = 'Validation failed:' + id;

            return next(err);
        }
    };
};

