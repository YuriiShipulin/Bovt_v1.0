var Comment = require('../models/comment');
var Customer = require('../models/customer');
var Item = require('../models/item');

var handler = {
    get: function (req, res, next) {
        Comment.find({_id: req.params.id}, function (err, comment) {

            if (err) return next(err);

            if (comment.length) {
                res.status(200).send(comment);
            } else {
                res.status(403).send('No such comment: ' + req.params.id);
            }
        });
    },

    create: function (req, res, next) {
        var comment = new Comment(req.body);

        comment.save(function (err, comment) {

            if (err) return next(err);
        });

        res.status(200).send('Comment created: ' + comment);
    },

    delete: function (req, res, next) {
        Comment.remove({_id: req.params.id}, function(err) {
            if (err) return next(err);

            res.status(200).send('Comment: ' + req.params.id + " deleted");
        });
    }
};

module.exports = handler;
