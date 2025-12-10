const express = require("express");
const router = express.Router();
const { signUp , getAllUsers , logIn, verifyAuth } = require('../controllers/auth.controller');

router.post('/sign-up', signUp);
router.get('/users', getAllUsers);
router.post('/log-in', logIn);
router.post('/verify', verifyAuth)

module.exports = router;