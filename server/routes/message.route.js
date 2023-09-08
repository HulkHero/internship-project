
const router = require('express').Router();
const { addMessage, getMessages } = require('../controllers/Message.controller');
const authentication = require('../middlewares/Authentication');

router.post('/', authentication, addMessage);

router.get('/:chatId', authentication, getMessages);

module.exports = { messageRouter: router };