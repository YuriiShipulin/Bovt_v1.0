var Item = require('../models/item');
var Customer = require('../models/customer');
var Category = require('../models/category');

var handler = {
    renderItem: function (req, res, next) {
        res.render('Item');
    },

    get: function (req, res, next) {
        Item.find({_id: req.params.id}, function (err, item) {
            if (err) return next(err);

            if (item.length) {
                res.status(200).send(item);
            } else {
                res.status(403).send('No such item: ' + req.params.id);
            }
        });
    },

    create: function (req, res, next) {
        var item = new Item(req.body);

        item.save(function (err, item) {

            if (err) return next(err);

            //console.log(item);
        });

        res.status(200).send('Item created: ' + item);
    },

    delete: function (req, res, next) {
        Item.remove({_id: req.params.id}, function(err) {
            if (err) return next(err);

            res.status(200).send('Item: ' + req.params.id + " deleted");
        });
    },


    update: function (req, res, next) {                     //TODO
        res.send('item updating...');
    }
};

module.exports = handler;