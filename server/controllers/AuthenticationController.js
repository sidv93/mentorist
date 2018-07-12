var User = require('../models/User.js');
var HttpStatus = require('http-status');
var MailController = require('./MailingController.js');

exports.authenticate = function(req,res) {
	var reqBody = req.body;
	console.log("Request body = " + JSON.stringify(reqBody));

	if(reqBody.userId && reqBody.password) {
		User.findOne({$or:[{userId:reqBody.userId},{email: reqBody.userId}],password:reqBody.password}).exec(function (err,user){
			if(err) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					status: 'failure',
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Unexpected error in getting authenticated'
				});
				return;
			}
			if(user == null) {
				res.status(HttpStatus.NOT_FOUND).json({
					status: 'failure',
					code: HttpStatus.NOT_FOUND,
					error: 'User not found'
				});
				return;
			}
			if(user != null) {
				console.log("user-" + JSON.stringify(user));
				if(user.emailVerified) {
					res.status(HttpStatus.OK).json({
						status: 'success',
						code: HttpStatus.OK,
						data: "User authenticated successfully"
					});
					return;
				} else {
					res.status(HttpStatus.BAD_REQUEST).json({
						status: 'failure',
						code: HttpStatus.BAD_REQUEST,
						error: 'User email not verified'
					});
					return;
				}
				
			}
	});
	}
	else {
		res.status(HttpStatus.BAD_REQUEST).json({
			status: 'failure',
			code: HttpStatus.BAD_REQUEST,
			error: 'Username or password missing'
		});
		return;
	}
}

exports.register = function(req,res) {
	var reqBody = req.body;
	console.log("Request body = " + JSON.stringify(reqBody));

	User.findOne({email: reqBody.email}).exec(function(err,user) {
		if(err) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					status: 'failure',
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Unexpected error in checking if user exists'
			});
			return;
		}
		if(user != null) {
			res.status(HttpStatus.BAD_REQUEST).json({
			status: 'failure',
			code: HttpStatus.BAD_REQUEST,
			error: 'User already exists'
		});
		return;
		}
		if(user == null) {
			console.log("User does not exist");
			var userModel = new User();
			userModel.firstName = reqBody.firstName;
		  	userModel.lastName = reqBody.lastName;
		  	userModel.password = reqBody.password;
		  	userModel.email = reqBody.email;
		  	userModel.mobileNumber = reqBody.mobileNumber;
		  	userModel.isMentor = reqBody.isMentor;

			console.log("user model= " + JSON.stringify(userModel));
			userModel.createdAt = Date.now();
			userModel.updatedAt = Date.now();

			userModel.save(function(err,saveRes) {
				if(err) {
					console.log("err=" + JSON.stringify(err));
					res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
						status: 'failure',
						code: HttpStatus.INTERNAL_SERVER_ERROR,
						error: 'Unexpected error in saving data'
					});
					return;
				}
				if(saveRes) {
					console.log("save response="+JSON.stringify(saveRes));
					// MailController.sendMail(userModel.email, userModel.firstName, userModel.lastName, function(err,data) {
					// 	if(err) {
					// 		res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					// 			status: 'failure',
					// 			code: HttpStatus.INTERNAL_SERVER_ERROR,
					// 			error: 'Unexpected error in sending email'
					// 		});
					// 		return;
					// 	}
					// 	console.log("mail response="+ JSON.stringify(data));
					// 	if(data) {
					// 		console.log("sending reponse to front");
					// 		res.status(HttpStatus.OK).json({
					// 			status: 'success',
					// 			code: HttpStatus.OK,
					// 			data: 'User saved successfully'
					// 		});
					// 		return;
					// 	}
					// });
					MailController.sendMail(userModel.email, userModel.firstName, userModel.lastName);
					res.status(HttpStatus.OK).json({
						status: 'success',
						code: HttpStatus.OK,
						data: 'User saved successfully'
					});
					return;
				}
			});
		}
	});
}

exports.verifyEmail= function(req,res) {
	var email= req.params.email;
	console.log("user= " + email);

	User.findOne({"email": email}).exec(function(err, user) {
		if(err) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: 'failure',
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				error: 'Unexpected error in getting user'
			});
			return;
		} else if(user) {
			user.emailVerified= true;
			user.save(function(err, response) {
				if(err) {
					res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
						status: 'failure',
						code: HttpStatus.INTERNAL_SERVER_ERROR,
						error: 'Unexpected error in saving user'
					});
					return;
				} else if(response) {
					var path= require('path');
					res.sendFile(path.resolve('dist/index.html'));
				}
			})
		}
	})
}

exports.resendMail= function(req, res) {
	var reqBody= req.body;
	console.log("Body=" + JSON.stringify(reqBody));

	User.findOne({email: reqBody.email}).exec(function(err, user) {
		if(err) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: 'failure',
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				error: 'Unexpected error in getting user'
			});
			return;
		}
		if(user) {
			if(!user.emailVerified) {
				MailController.sendMail(reqBody.email, reqBody.firstName, reqBody.lastName);
				res.status(HttpStatus.OK).json({
					status: 'success',
					code: HttpStatus.OK,
					data: 'Email sent'
				});
				return;
			} else {
				res.status(HttpStatus.BAD_REQUEST).json({
					status: 'failure',
					code: HttpStatus.BAD_REQUEST,
					error: 'User already verified'
				});
			}
		}
	});
}