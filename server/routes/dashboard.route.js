const authentication = require('../middlewares/Authentication');
const { stats, charts, managersChart, projectsTime } = require('../controllers/Dashboard.controller');
const router = require('express').Router();

router.get("/stats", authentication, stats)
router.get("/charts", authentication, charts)
router.get("/managers", authentication, managersChart)
router.get("/projectsTime", authentication, projectsTime)
module.exports = {
    dashboardRouter: router
};