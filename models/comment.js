var mongoose = require('../helpers/mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    customer : {
        type : ObjectId,
        ref : 'Customer',
        required : true
    },

    item : {
        type : ObjectId,
        ref : 'Item',
        required : true
    },

    text : {
        type : String,
        required : true
    },

    date : {
        type : Date, default : Date.now
    }
});

module.exports = mongoose.model("Comment", schema);
