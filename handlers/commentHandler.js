var Comment = require('../models/comment');
var Customer = require('../models/customer');
var Item = require('../models/item');

module.explores = function () {
    this.getById = function (req, res, next) {
        var id = req.params.id;

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
    };

    this.create = function (req, res, next) {
        var comment = new Comment(req.body);

        comment.save(function (err) {

            if (err) return next(err);
        });
        res.status(200).send('Comment created: ' + comment);
    };

    this.delete = function (req, res, next) {
        var id = req.params.id;
        Comment
            .findByIdAndRemove(id, function (err) {
                if (err) {
                    err.status = 400;
                    err.message = 'Bad params: ' + id;

                    return next(err)
                }
                res.status(200).send('Comment: ' + req.params.id + " deleted");
            });
    };
};

module.exports = handler;
