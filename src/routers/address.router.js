const express = require("express");
const router = express.Router();
const { createDeliveryAddress , getDeliveryAddress } = require('../controllers/address.controller');

router.get("/:id", getDeliveryAddress);
router.post("/add", createDeliveryAddress);

module.exports = router;