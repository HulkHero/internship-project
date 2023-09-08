
const router = require('express').Router();
const { addProject } = require('../controllers/Project.controller');
const authentication = require('../middlewares/Authentication');
const authorization = require('../middlewares/Authorization');

router.post('/add', authentication, authorization.adminAuthz, addProject);

module.exports = { projectRouter: router }