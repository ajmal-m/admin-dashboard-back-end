const express = require("express");
const router = express.Router();
const { signUp , getAllUsers , logIn } = require('../controllers/auth.controller');

router.post('/sign-up', signUp);
router.get('/users', getAllUsers);
router.post('/log-in', logIn);

module.exports = router;