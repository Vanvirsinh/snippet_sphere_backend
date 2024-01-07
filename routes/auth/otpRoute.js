const express = require('express');
const router = express.Router();
const { validateUserRegistration, sendOtp } = require('../../controllers/auth/otpController');

router.post('/send-otp', validateUserRegistration, sendOtp);

module.exports = router;