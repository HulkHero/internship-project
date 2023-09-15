const router = require('express').Router();
const { createChat, userChats, findChats } = require('../controllers/Chat.controller');
const authentication = require('../middlewares/Authentication');

router.post('/', authentication, createChat);
router.get('/:userId', authentication, userChats);
router.get('/find/:firstId/:secondId', authentication, findChats);

module.exports = { chatRouter: router };