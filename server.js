// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ChatsController = require('./server/controllers/ChatsController.js');

// Get our API routes
const routes = require('./server/routes/routes');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//mongooose connection to mongodb
mongoose.connect('mongodb://localhost/mentorist');

// Set our api routes
app.use('/', routes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

//Initialise socket io
var io = require('socket.io').listen(server);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

io.on('connection',function(socket) {
	console.log("Connection established");
	let currentChat= "myChat";
	socket.join(currentChat);
	socket.in(currentChat).on('chat-msg', function(data) {
		console.log("Message from front end="+ data.message);
		console.log("socket connections="+ JSON.stringify(socket.rooms));
		ChatsController.saveChat(data, function(err,response) {
			if(err) {
				console.log("error in sending message");
				io.to(currentChat).emit('msg-back',{"status": "failure","sender": data.sender});
			}
			if(response) {
				console.log("Message sent successfully");
				io.to(currentChat).emit('msg-back',{"status": "success","sender": data.sender,"message": data.message});
			}
		});
	});
	socket.on('switch-chat', function(data) {
		console.log("switch=" + data);
		socket.leave(data.currentChat);
		currentChat= data;
		socket.join(data);
		console.log("current chat is " + currentChat);
	})
});
