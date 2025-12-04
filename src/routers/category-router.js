const express = require("express");
const router = express.Router();
const {addCategory} = require('../controllers/category-controller');

router.post('/add',addCategory);
router.get('/all', (req, res) => {
    res.status(200).json({
        message:"ALL Category reterived...",
        success:true,
    });
});

module.exports = router;