var mongoose = require('../helpers/mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },

    category : {
        type : String,
        required : true
    },

    quantity : {
        type : Number
    },

    description : {
        type : String,
        required : true
    },

    longDesc : {
        type : String
    },

    image : {
        type : Buffer
    },

    comments : [{
        type : ObjectId,
        ref : 'Comments'
    }]
});

module.exports = mongoose.model("Item", schema);