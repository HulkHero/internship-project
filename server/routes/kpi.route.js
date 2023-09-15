const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/Authorization');
const authentication = require('../middlewares/Authentication');
const { addKpi, getKpi } = require('../controllers/Kpi.controller');
const { getRoles } = require('../controllers/Kpi.controller');

router.post('/add', authentication, authorization.AdminOrManager, addKpi);
router.get('/get', authentication, getRoles)
router.get('/getKpi/:techRole', authentication, getKpi)




module.exports = { kpiRouter: router }