const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, getOrdersByUserId , getOrderByOrderId,
    updateOrderStatus, deleteOrder
 } = require('../controllers/order.controller');


router.get("/:id", getOrderByOrderId);
router.get("/user/:id", getOrdersByUserId);
router.get("/", getAllOrders ) ;
router.post("/create", createOrder);
router.put("/update-order", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router; 