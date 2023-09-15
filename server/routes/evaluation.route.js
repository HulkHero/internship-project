const { addEvaluation } = require('../controllers/Evaluation.controller');
const authentication = require('../middlewares/Authentication');
const authorization = require('../middlewares/Authorization');
const router = require('express').Router();

router.post('/add', authentication, authorization.AdminOrManager, addEvaluation);

module.exports = { evaluationRouter: router }