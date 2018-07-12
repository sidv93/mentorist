var Email = require('../Models/Email.js');
var nodemailer = require('nodemailer');
var nunjucks= require('nunjucks');

var transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user:"iworkz.xyz@gmail.com",
    pass: "jcecseb2011"
  }
});

exports.sendMail = function(emailId, firstName, lastName) {
  console.log("email obj=" + emailId + ".first" + firstName);
  var template= nunjucks.render('server/templates/verifyEmail.html',{firstName: firstName,lastName:lastName,email: emailId});
  
  var options = {
    to: emailId,
    subject: "Welcome to Mentor application",
    html: template
  };
  
  transport.sendMail(options, function(error,response) {
    if(error) {
      console.log("Could not send mail=" + JSON.stringify(error));
      // callback(error, null);
    }
    else {
      console.log("Email was success=" + JSON.stringify(response));
      var email = new Email();
      email.receiver = emailId;
      email.purpose = "Signup";
      email.createdAt = Date.now();
      email.save(function(err,response) {
        if(err) {
          console.log("Error while saving email="+ JSON.stringify(err));
          // callback(err,null);
        }
        if(response) {
          console.log("email saved successfully");
          // callback(null,response);
        }
      });
    }
  })
}