var mongoose = require('mongoose');
var Schema = mongoose.Schema();
var ObjectId = Schema.Types.ObjectId;

var MatchesSchema = new Schema({
	student: {type: ObjectId, ref: 'User', required: true},
	mentor: {type: ObjectId, ref: 'User', required: true},
	createdAt: {type: Date, default: Date.now},
	field: {type: String, enum:["IT","Commerce","Electronics"], required: true},
	matchedTechnology: [String]
});

module.exports = mongoose.model('Matches',MatchesSchema);