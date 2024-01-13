const express = require('express');
const router = express.Router();
const { register, validateUserRegistration } = require('../../controllers/auth/register');
const { login, validateUserLogin } = require('../../controllers/auth/login');
const { forgetPassword, validateForgetPassword } = require('../../controllers/auth/forgetPassword');
const { resetPassword, validateResetpassword } = require('../../controllers/auth/resetPassword');
const { fetchUser } = require('../../middleware/fetchUser');
const { getUser } = require('../../controllers/auth/getUser');

router.get('/getUser', fetchUser, getUser);
router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.post('/forget-password', validateForgetPassword, forgetPassword);
router.post('/reset-password', fetchUser, validateResetpassword, resetPassword);

module.exports = router;