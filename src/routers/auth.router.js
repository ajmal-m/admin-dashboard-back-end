const express = require("express");
const router = express.Router();
const { signUp , getAllUsers } = require('../controllers/auth.controller');

router.post('/sign-up', signUp);
router.get('/users', getAllUsers);

module.exports = router;