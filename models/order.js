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
        default: parseInt(Math.random * 1000000)
    },

    purchaseDate : {
        type : Date, default : Date.now
    },

    invoiceType : {
        type : String,
        enum : ['cash', 'cashless']
    },

    isPaid : {
        type : Boolean, default: false
    }
});

module.exports = mongoose.model("Order", schema);
