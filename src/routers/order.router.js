const express = require("express");
const router = express.Router();
const { createOrder, getOrderByUser, getOrdersByUserId , getOrderByOrderId } = require('../controllers/order.controller');


router.get("/:id", getOrderByOrderId);
router.get("/user/:id", getOrdersByUserId);
router.get("/", getOrderByUser ) ;
router.post("/create", createOrder);

module.exports = router; 