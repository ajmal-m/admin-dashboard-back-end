const express = require("express");
const router = express.Router();
const { createDeliveryAddress , getDeliveryAddress, deleteDeliveryAddress } = require('../controllers/address.controller');

router.get("/:id", getDeliveryAddress);
router.post("/add", createDeliveryAddress);
router.delete("/:id", deleteDeliveryAddress )

module.exports = router;