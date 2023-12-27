const express = require('express');
const router = express.Router();
const { register, validateUserRegistration } = require('../../controllers/auth/register');
const { login, validateUserLogin } = require('../../controllers/auth/login');

router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);

module.exports = router;