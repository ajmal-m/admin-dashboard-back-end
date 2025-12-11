const express = require("express");
const router = express.Router();
const { signUp , getAllUsers , logIn, verifyAuth , deleteAllUsers } = require('../controllers/auth.controller');

router.post('/sign-up', signUp);
router.get('/users', getAllUsers);
router.post('/log-in', logIn);
router.get('/verify-auth', verifyAuth);
router.delete('/delete', deleteAllUsers);

module.exports = router;