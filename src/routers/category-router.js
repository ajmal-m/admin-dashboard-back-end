const express = require("express");
const router = express.Router();
const {addCategory , getCategories, deleteCategory, editCategory } = require('../controllers/category-controller');

const multer = require("multer");
const upload = multer({ dest: 'uploads/' })

router.post('/add', upload.single("image") , addCategory);
router.get("/all", getCategories);
router.delete("/", deleteCategory);
router.put("/",upload.single("image"), editCategory);

module.exports = router;