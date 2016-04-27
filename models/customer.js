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
        ref : 'Order'
    }],

    comments : [{
        type : ObjectId,
        ref : 'Comment'
    }],

    role : {
        type : Number, default : 0,
        unique : false
    },

    surname : {
        type: String,
        unique: false
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
        type: Number, min: 12, max: 100,
        unique: false
    },

    lastVisit : {
        type: Date, default: Date.now,
        unique: false
    },

    image : {
        type: String,
        unique: false,
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

module.exports = mongoose.model("Customer", schema);
