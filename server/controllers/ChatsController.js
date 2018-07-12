var User = require('../models/User.js');
var Chat = require('../models/Chat.js');
var HttpStatus = require('http-status');

exports.getAllChatsByUser = function(req,res) {
	var userId = req.params.userId;
	console.log("Userid=" + userId);

	Chat.find({users:{$elemMatch:{email:userId}}}).exec(function(err, chats) { 	
		if(err) {
			console.log("Error=" + JSON.stringify(err));
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status: 'failure',
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				error: 'Unexpected error in getting chat record'
			});
			return;
		}
		if(chats == null) {
			res.status(HttpStatus.NOT_FOUND).json({
				status: 'failure',
				code: HttpStatus.NOT_FOUND,
				error: 'Chats not found'
			});
			return;
		}
		if(chats.length > 0) {
			res.status(HttpStatus.OK).json({
				status: 'success',
				code: HttpStatus.OK,
				data: chats
			});
			return;
		}
		res.status(HttpStatus.BAD_REQUEST).json({
			status: 'failure',
			code: HttpStatus.BAD_REQUEST,
			error: 'Unable to retriee chats'
		});
	})
}

exports.saveChat = function(data,callback) {
	var reqBody = data;
	console.log("request body of save chat=" + JSON.stringify(reqBody));
	console.log(reqBody.sender);
	console.log(reqBody.receiver);

	Chat.findOne({$and:[{users:{$elemMatch:{email:reqBody.sender}}},{users:{$elemMatch:{email:reqBody.receiver}}}]}).exec(function(err,chats) {   
		if(err) {
			callback(err, null);
		}
		if(chats == null || chats.length == 0) {
			var newChat = new Chat();

			newChat.createdAt= Date.now();
			newChat.updatedAt= Date.now();

			var chatObj = {
				"message" : reqBody.message,
				"timestamp" : Date.now(),
				"sender" : reqBody.sender,
				"receiver" : reqBody.receiver
			}
			newChat.chats.push(chatObj);

			User.findOne({email:reqBody.sender},{firstName:1, lastName:1}).exec(function(err,sender) {
				if(err) {
					callback(err,null);
				}
				if(sender) {
					var userNameObj1= {
						"firstName": sender.firstName,
						"lastName": sender.lastName,
						"email": reqBody.sender
					}
					newChat.users.push(userNameObj1);

					User.findOne({email: reqBody.receiver},{firstName:1, lastName:1}).exec(function(err, receiver) {
						if(err) {
							console.log("err");
							callback(err,null);
						}
						if(receiver) {
							var userNameObj2= {
								"firstName": receiver.firstName,
								"lastName": receiver.lastName,
								"email": reqBody.receiver
							}
							newChat.users.push(userNameObj2);
							console.log("Newchat=" + JSON.stringify(newChat));
							newChat.save(function(err, saveRes) {
								if(err) {
									callback(err,null);
								}
								if(saveRes) {
									callback(null,saveRes);
								}
								callback(err,null);
							})
						}
					});
				}
			});
		} else if(chats != null) {
			console.log("Already existing chat");
			var chatObj = {
				"message" : reqBody.message,
				"timestamp" : Date.now(),
				"sender" : reqBody.sender,
				"receiver" : reqBody.receiver
			}
			chats.updatedAt = Date.now();
			chats.chats.push(chatObj);

			chats.save(function(err,saveRes) {
				if(err) {
					callback(err,null);
				}
				if(saveRes) {
					callback(null,saveRes);
				}
				callback(err,null);
			})
		}
	});
}

exports.getSelectedChat= function(req,res) {
	var requester= req.params.requester;
	var chatRequested= req.params.chatId;
	console.log("req="+ requester + " chat=" + chatRequested); 	
	
	if(requester > chatRequested) {
		console.log("in if");
		Chat.findOne({$and:[{users:{$elemMatch:{email:requester}}},{users:{$elemMatch:{email:chatRequested}}},{chats:{$elemMatch:{user2Delete: false}}}]}).exec(function(err,chat) {
			if(err) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					status: 'failure',
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Unexpected error in getting user record'
				});
				return;
			}
			if(chat) {
				console.log("chat="+ JSON.stringify(chat));
				res.status(HttpStatus.OK).json({
					status: 'success',
					code: HttpStatus.OK,
					data: chat
				});
			} else if(chat == null) {
				console.log("chat=" + JSON.stringify(chat));
				res.status(HttpStatus.NOT_FOUND).json({
					status: 'failure',
					code: HttpStatus.NOT_FOUND,
					data: 'No chat available'
				});
			}
		});
	} else if(chatRequested > requester ) {
		console.log("in else");
		Chat.findOne({$and:[{users:{$elemMatch:{email:requester}}},{users:{$elemMatch:{email:chatRequested}}},{chats:{$elemMatch:{user1Delere: false}}}]}).exec(function(err,chat) {
			if(err) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					status: 'failure',
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Unexpected error in getting user record'
				});
				return;
			}
			if(chat) {
				res.status(HttpStatus.OK).json({
					status: 'success',
					code: HttpStatus.OK,
					data: chat
				});
			}
		});
	}

	
}

exports.clearConversation= function(req,res) {
	var reqBody= req.body;

	console.log("body=" + JSON.stringify(reqBody));

	Chat.findOne({$and:[{users:{$elemMatch: {email: reqBody.requester}}},{users: {$elemMatch: {email: reqBody.requested}}}]}).exec(function(err, chat) {
		if(err) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				status:'failure',
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				error: 'Unexpected error in getting chat'
			});
			return;
		}
		if(chat) {
			let toBeDeleted= null;
			chat.users.forEach(user => {
				if(user.email === reqBody.requester) {
					toBeDeleted= user.email;
				}
			});
			console.log("tobe=" + toBeDeleted);
			if(reqBody.requester > reqBody.requested) {
				console.log("inside if");
				chat.chats.forEach(chatObj => {
					chatObj.user2Delete= true;
				});
				chat.save( function(err,saveRes) {
					if(err) {
						res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
							status: 'failure',
							code: HttpStatus.INTERNAL_SERVER_ERROR,
							error: 'Unexpected error in saving chat'
						});
						return;
					} else if(saveRes) {
						res.status(HttpStatus.OK).json({
							status: 'success',
							code: HttpStatus.OK,
							data: 'Conversations deleted successfully'
						});
						return;
					}
				})
			} else if( reqBody.requested > reqBody.requester) {
				console.log("inside else ")
				chat.chats.forEach(chatObj => {
					chatObj.user1Delere= true;
				});
				chat.save( function(err,saveRes) {
					if(err) {
						res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
							status: 'failure',
							code: HttpStatus.INTERNAL_SERVER_ERROR,
							error: 'Unexpected error in saving chat'
						});
						return;
					} else if(saveRes) {
						res.status(HttpStatus.OK).json({
							status: 'success',
							code: HttpStatus.OK,
							data: 'Conversations deleted successfully'
						});
						return;
					}
				});
			}
		}
	})
}