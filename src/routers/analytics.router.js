const express = require("express");
const router = express.Router();
const { deliveredOrdersCount , salesAtLastWeek,
    totalUserCount , averageOrderValue , orderStatusDatas , topProductsOfLastWeek,
    lastWeekEachDaySales , topCategories
 } = require('../controllers/analytics.controller');

router.get("/delivered-order-count", deliveredOrdersCount);
router.get("/sales-at-last-week", salesAtLastWeek);
router.get("/user-count", totalUserCount);
router.get("/avg-order-val", averageOrderValue);
router.get("/order-status" , orderStatusDatas );
router.get("/top-products", topProductsOfLastWeek);
router.get("/last-week-days-sales", lastWeekEachDaySales);
router.get("/top-categories", topCategories )

module.exports = router; 