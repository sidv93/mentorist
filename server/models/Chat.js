var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ChatSchema = new Schema({
	message: {type: String},
	timestamp: {type: Date, default: Date.now},
	sender: {type: String, required: true},
	receiver: {type: String, required: true},
	user1Delete: {type: Boolean, default:false},
	user2Delete: {type: Boolean, default: false}
}, {_id: false});

var UsernameSchema= new Schema({
	firstName: {type: String},
	lastName: {type: String},
	email: {type: String}
});

var ChatsByUserSchema = new Schema({
	chats: [ChatSchema],
	users: [UsernameSchema],
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Chat', ChatsByUserSchema);