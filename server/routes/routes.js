const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthenticationController.js');
const ChatController = require('../controllers/ChatsController.js');
const UserController= require('../controllers/UserController.js');

/* GET api listing. */
router.get('/api/getAllChatsByUser/:userId', ChatController.getAllChatsByUser);
router.get('/api/getSelectedChat/:requester/:chatId', ChatController.getSelectedChat);
router.get('/api/verifyEmail/:email',AuthController.verifyEmail);
router.get('/api/getAllUsers', UserController.getAllUsers);
router.get('/api/getUser/:email', UserController.getUser);

/* POST api listing */
router.post('/api/authenticate', AuthController.authenticate);
router.post('/api/register', AuthController.register);
router.post('/api/saveChat', ChatController.saveChat);
router.post('/api/resendMail', AuthController.resendMail);

/* PUT api listing */
router.put('/api/clearConversation', ChatController.clearConversation);



module.exports = router;