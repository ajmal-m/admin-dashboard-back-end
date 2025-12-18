const express = require("express");
const router = express.Router();
const { createOrder, getOrderByUser } = require('../controllers/order.controller');


router.get("/", getOrderByUser ) ;
router.post("/create", createOrder);

module.exports = router; 