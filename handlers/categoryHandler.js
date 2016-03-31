var Category = require('../models/category');

var handler = {
    renderCategory: function (req, res, next) {
        res.render('category');
    },

    get: function (req, res, next) {
        Category.find({name: req.params.id}, function (err, category) {
            if (err) return next(err);

            if (category.length) {
                res.status(200).send(category);
            } else {
                res.status(403).send('No such category: ' + req.params.id);
            }
        });
    },

    getAll: function (req, res, next) {
        Category.find({}, function (err, categories) {
            if (err) return next(err);

            if (categories) {
                res.status(200).send(categories);
            }
        });
    },

    create: function (req, res, next) {
        var category = new Category(req.body);

        category.save(function (err, category) {
            if (err) return next(err);

            //console.log(category);
        });
        res.status(200).send(category.name + ' was created');
    },

    delete: function (req, res, next) {
        Category.remove({name: req.params.id}, function(err) {
            if (err) return next(err);

            res.status(200).send('Category: ' + req.params.id + " deleted");
        });
    },

    update: function (req, res, next) {                 //TODO
        res.send('category updating...');
    }
};

module.exports = handler;