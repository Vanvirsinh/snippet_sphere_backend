const otpGenerator = require("otp-generator");
const OTP = require("../../models/auth/otpModel");
const { body, validationResult } = require("express-validator");
const User = require("../../models/auth/userModel");

const passwordValidator = (value) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
};

const validateForgetPassword = [
  body("email").isEmail().withMessage("Enter a valid email address!"),
  body("password")
    .custom(passwordValidator)
    .withMessage(
      "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
    )
    .isLength({ max: 30 })
    .withMessage("Password should not be more than 30 characters long!"),
];

const sendOtpForgetPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const user = {
          email,
          password,
          confirmPassword
        };
    
        // Validating inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).send({ success: false, errors: errors.array() });
        }

        // Password cross-checking
        if (password !== confirmPassword) {
            return res.status(400).send({ success: false, message: "Password mismatch, please re-enter matching passwords!" })
        }
    
        let otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
    
        const newOtp = new OTP({
          email,
          otp,
        });
    
        return newOtp
          .save()
          .then(() => {
            return res.status(200).send({
              success: true,
              message: "OTP sent successfully!",
              user: user,
              error: null
            });
          })
          .catch((error) => {
            return res.status(400).send({
              success: false,
              message: "Failed to send an OTP!",
              error,
              user: null
            });
          });
      } catch (error) {
        console.error(error.message)
        return res.status(500).send({ success: false, message: "Oops! Something went wrong!" });
      }
};

module.exports = { sendOtpForgetPassword, validateForgetPassword };
