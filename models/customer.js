var mongoose = require('../helpers/mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    name : {
        type: String,
        unique: false,
        required: true
    },

    orders : [{
        type : ObjectId,
        ref : 'Orders'
    }],

    comments : [{
        type : ObjectId,
        ref : 'Comments'
    }],

    role : {
        type : Number, default : 0,
        unique : false,
        required : true
    },


    surname : {
        type: String,
        unique: false,
        required: false
    },

    passwordHash : {
        type: String,
        required: true
    },

    salt : {
        type: String,
        required: true
    },

    email : {
        type: String,
        unique: true,
        required: true
    },

    phone : {
        type: String,
        unique: true,
        required: true
    },

    age : {
        type: Number, min: 18, max: 99,
        unique: false,
        required: false
    },

    lastVisit : {
        type: Date, default: Date.now,
        unique: false,
        required: false
    },

    image : {
        type: Date,
        unique: false,
        required: false
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

schema.methods.buy = function(){
    //TODO
};

schema.methods.makeComment = function(commentName){
    //TODO
};

schema.methods.deleteComment = function(commentName){
    //TODO
};

module.exports = mongoose.model("Customer", schema);
