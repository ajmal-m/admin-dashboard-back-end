const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, getOrdersByUserId , getOrderByOrderId } = require('../controllers/order.controller');


router.get("/:id", getOrderByOrderId);
router.get("/user/:id", getOrdersByUserId);
router.get("/", getAllOrders ) ;
router.post("/create", createOrder);

module.exports = router; 