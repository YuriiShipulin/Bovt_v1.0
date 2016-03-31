var mongoose = require('../helpers/mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },

    products : [{
        type : ObjectId,
        ref : 'Product'
    }],

    description : {
        type : String
    },

    image : {
        type : Buffer
    }
});

module.exports = mongoose.model("Category", schema);