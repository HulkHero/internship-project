
const router = require('express').Router();
const { add, remove, get } = require('../controllers/Notification.controller');

router.post('/add', add);

router.post('/remove', remove);

router.get('/get', get);

module.exports = { notificationRouter: router };