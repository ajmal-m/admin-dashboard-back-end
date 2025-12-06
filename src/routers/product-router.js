const express = require("express");
const router = express.Router();
const { addProducts , getProducts , deleteAllProducts , deleteProduct } = require('../controllers/product-controller');

const multer = require("multer");
const upload = multer({ dest: 'uploads/' })

router.post('/add', upload.single("image") , addProducts);
router.get("/all", getProducts);
router.delete("/all", deleteAllProducts);
router.delete("/", deleteProduct);

module.exports = router;