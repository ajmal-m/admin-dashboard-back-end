const express = require("express");
const router = express.Router();
const { sendOTP , verifyOTP } = require('../controllers/email.controller');


router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP)

module.exports = router; 