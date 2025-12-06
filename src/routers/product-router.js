const express = require("express");
const router = express.Router();
const { addProducts , getProducts } = require('../controllers/product-controller');

const multer = require("multer");
const upload = multer({ dest: 'uploads/' })

router.post('/add', upload.single("image") , addProducts);
router.get("/all", getProducts);

module.exports = router;