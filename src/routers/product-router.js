const express = require("express");
const router = express.Router();
const { addProducts , getProducts , deleteAllProducts , deleteProduct , updateProduct , getProductsById } = require('../controllers/product-controller');

const multer = require("multer");
const upload = multer({ dest: 'uploads/' })

router.post('/add', upload.single("image") , addProducts);
router.get("/all", getProducts);
router.get("/:id", getProductsById);
router.delete("/all", deleteAllProducts);
router.delete("/", deleteProduct);
router.put("/", upload.single("image"), updateProduct);

module.exports = router;