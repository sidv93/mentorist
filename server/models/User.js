var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	dob: {type: Date},
	email: {type: String, required: true, unique: true},
	mobileNumber: {type: String, required: true, unique: true},
	profilePicture: {type: String},
	location:{
		areaName: {type: String},
		city: {type: String},
		state: {type: String},
		latitude: {type: String},
		longitude: {type: String}
	},
	password: {type: String, required: true},
	about: {type: String},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	linkedInUrl: {type: String},
	isMentor: {type: Boolean, required: true},
	field: {type: String, enum:["IT","Commerce","Electronics"]},
	institution: {type: String},
	qualification: {type: String},
	areaOfInterest: [String],
	organisation: {type: String},
	yearsOfExperience: {type: Number},
	areaOfExpertise: [String],
	rating: [Number],
	comments: [String],
	currentlyMentoring: {type: Number},
	currentlyMentoringWith: {type: Number},
	report: {type: Number},
	emailVerified: {type: Boolean, default: false}
});

module.exports = mongoose.model('User',UserSchema);