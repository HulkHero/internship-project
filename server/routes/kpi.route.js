const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/Authorization');
const authentication = require('../middlewares/Authentication');
const { addKpi } = require('../controllers/Kpi.controller');
const { getRoles } = require('../controllers/Kpi.controller');

router.post('/add', authentication, authorization.adminAuthz, addKpi);
router.get('/get', authentication, getRoles)




module.exports = { kpiRouter: router }