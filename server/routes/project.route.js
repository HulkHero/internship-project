
const router = require('express').Router();
const { addProject, getPaginatedProjects, getSingleProject } = require('../controllers/Project.controller');
const authentication = require('../middlewares/Authentication');
const authorization = require('../middlewares/Authorization');

router.post('/add', authentication, authorization.AdminOrManager, addProject);
router.get('/paginatedProjects', authentication, authorization.AdminOrManager, getPaginatedProjects);
router.get('/singleProject/:_id', authentication, authorization.AdminOrManager, getSingleProject)

module.exports = { projectRouter: router }