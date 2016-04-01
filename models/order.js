var mongoose = require('../helpers/mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({

    items : [{
        type : ObjectId,
        ref : 'Item'
    }],

    code : {
        type : [String],
        unique : true
    },

    purchaseDate : {
        type : Date, default : Date.now
    },

    invoiceType : {
        type : String,
        enum : ['cash', 'cashless']
    },

    isPaid : {
        type : Boolean
    }
});

module.exports = mongoose.model("Order", schema);