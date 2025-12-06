const express = require("express");
const router = express.Router();
const { addProducts } = require('../controllers/product-controller');

const multer = require("multer");
const upload = multer({ dest: 'uploads/' })

router.post('/add', upload.single("image") , addProducts);

module.exports = router;