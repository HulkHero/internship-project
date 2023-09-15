const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/Authorization');
const User = require('../controllers/User.controller');
const authentication = require('../middlewares/Authentication');



router.post('/signup', User.userSignup);

router.post('/addMember/:adminId', authentication, authorization.AdminOrManager, User.addUser);

router.post('/login', User.userLogin)

router.get("/getAllUsers", authentication, authorization.AdminOrManager, User.getAllUsers);

router.get('/search/:searche', authentication, User.searchUser);

router.get("/checkEmail/:email", User.checkEmail);

router.post('/logout', authentication, User.logout);

router.get('/hello', authentication, authorization.adminAuthz, (req, res) => {
    res.status(200).json({ msg: "hello" })
});

module.exports = { userRouter: router }