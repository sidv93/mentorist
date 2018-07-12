var User= require('../models/User');
var HttpStatus = require('http-status');

exports.getAllUsers= function(req,res) {
    
    User.find({},{firstName:1,lastName: 1,email:1}).exec(function(err,users) {
        if(err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: 'Unexepected error in getting users'
            });
            return;
        }
        if(users) {
            if(users.length == 0) {
                res.status(HttpStatus.NOT_FOUND).json({
                    status: 'failure',
                    code: HttpStatus.NOT_FOUND,
                    data: 'No users found'
                });
                return;
            } else {
                res.status(HttpStatus.OK).json({
                    status: 'success',
                    code: HttpStatus.OK,
                    data: users
                });
            }
        }
    });
}

exports.getUser= function(req,res) {

    var email= req.param.email;
    
    User.findOne({email: email }).exec(function(err,user) {
        if(err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: 'Unexepected error in getting user'
            });
            return;
        }
        if(users) {
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: user
            });
        }
    });
}