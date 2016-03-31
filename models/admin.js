var mongoose = require('../helpers/mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    role : {
        type : Number,
        required : true, default : 1
    },

    name : {
        type: String, default: 'user' + Math.random() + '',
        unique: false,
        required: false
    },

    orders : [{
        type : ObjectId,
        ref : 'Orders'
    }],

    comments : [{
        type : ObjectId,
        ref : 'Comments'
    }],

    passwordHash : {
        type: String,
        required: true
    }

});

schema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.passwordHash = this.encryptPassword(password);
    })
    .get(function(){return this._plainPassword});

schema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.passwordHash;
};

schema.methods.createCategory = function(categoryName){
    //TODO
};

schema.methods.deleteCategory = function(categoryName){
    //TODO
};

schema.methods.updateCategory = function(categoryName){
    //TODO
};

schema.methods.createItem = function(itemName){
    //TODO
};

schema.methods.deleteItem = function(itemName){
    //TODO
};

schema.methods.updateItem = function(itemName){
    //TODO
};

schema.methods.makeComment = function(commentName){
    //TODO
};

schema.methods.deleteComment = function(commentName){
    //TODO
};




module.exports = mongoose.model("Admin", schema);
