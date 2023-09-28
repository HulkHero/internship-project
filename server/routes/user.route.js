const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/Authorization');
const User = require('../controllers/User.controller');
const authentication = require('../middlewares/Authentication');

router.post('/signup', User.userSignup);

router.post('/addMember/:adminId', authentication, authorization.AdminOrManager, User.addUser);

router.post('/login', User.userLogin)

router.get("/getAllUsers", authentication, authorization.AdminOrManager, User.getAllUsers);

router.get("/getEvaluationUsers", authentication, authorization.AdminOrManager, User.getPaginatedUsers);

router.get('/search/:searche', authentication, User.searchUser);

router.get("/checkEmail/:email", User.checkEmail);

router.post('/logout', authentication, User.logout);

router.put("/changeSystemRole", authentication, authorization.adminAuthz, User.changeSystemRole);

router.put("/editNames", authentication, authorization.adminAuthz, User.editNames);

router.get("/getCompanyName/:companyName", User.getCompanyName)

router.post("/payment", User.payment)
module.exports = { userRouter: router }