const authentication = require('../middlewares/Authentication');
const { stats } = require('../controllers/Dashboard.controller');
const router = require('express').Router();

router.get("/stats", authentication, stats)

module.exports = {
    dashboardRouter: router
};