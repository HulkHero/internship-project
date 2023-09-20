const authentication = require('../middlewares/Authentication');
const { stats, charts } = require('../controllers/Dashboard.controller');
const router = require('express').Router();

router.get("/stats", authentication, stats)
router.get("/charts", authentication, charts)

module.exports = {
    dashboardRouter: router
};