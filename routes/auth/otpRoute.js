const express = require('express');
const router = express.Router();
const { validateUserRegistration, sendOtp } = require('../../controllers/auth/otpController');
const { validateForgetPassword, sendOtpForgetPassword } = require('../../controllers/auth/otpForgetPassword');

router.post('/send-otp', validateUserRegistration, sendOtp);
router.post('/send-otp-forget-password', validateForgetPassword, sendOtpForgetPassword);

module.exports = router;