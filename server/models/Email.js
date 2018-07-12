var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new Schema({
	receiver: {type: String},
	purpose: {type: String, enum: ["Signup","Match"]},
	createdAt: {type: Date}
});

module.exports = mongoose.model('Email', EmailSchema)