var mongoose = require('../helpers/mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var schema = new Schema({
    role : {
        type : Number,
        required : true, default : 0
    },

    name : {
        type: String, default: 'user' + Math.random() + '',
        unique: false,
        required: false
    },

    orders : [{
        type : ObjectId,
        ref : 'Orders'
    }]
});

module.exports = mongoose.model("User", schema);
