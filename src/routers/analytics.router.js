const express = require("express");
const router = express.Router();
const { deliveredOrdersCount , salesAtLastWeek,
    totalUserCount , averageOrderValue
 } = require('../controllers/analytics.controller');

router.get("/delivered-order-count", deliveredOrdersCount);
router.get("/sales-at-last-week", salesAtLastWeek);
router.get("/user-count", totalUserCount);
router.get("/avg-order-val", averageOrderValue);

module.exports = router;