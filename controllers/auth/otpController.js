const otpGenerator = require("otp-generator");
const OTP = require("../../models/auth/otpModel");
const { body, validationResult } = require("express-validator");
const User = require("../../models/auth/userModel");

const userNameRegExValidator = (value) => {
  const userNameRegex = /^[a-zA-Z\-_]+$/;
  return userNameRegex.test(value);
};

const userNameValidator = async (value) => {
  const user = await User.findOne({ username: value });
  if (user) {
    throw new Error("Username already in use!");
  }
  return true;
};

const emailValidator = async (value) => {
  const email = await User.findOne({ email: value });
  if (email) {
    throw new Error("Email already in use!");
  }
  return true;
};

const passwordValidator = (value) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
};

const validateUserRegistration = [
  body("name")
    .notEmpty()
    .withMessage("Name is required!")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long!")
    .isLength({ max: 30 })
    .withMessage("Name must be within 30 characters long!"),
  body("username")
    .custom(userNameRegExValidator)
    .withMessage(
      "Username should only contain, letter, hyphens (-), and underscores (_)!"
    )
    .custom(userNameValidator)
    .withMessage("Username already exists!")
    .notEmpty()
    .withMessage("Username is required!")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long!")
    .isLength({ max: 30 })
    .withMessage("Username must be within 30 characters long!"),
  body("email")
    .isEmail()
    .withMessage("Enter a valid Email address!")
    .custom(emailValidator)
    .withMessage("Email address already exists!"),
  body("password")
    .custom(passwordValidator)
    .withMessage(
      "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character!"
    )
    .isLength({ max: 30 })
    .withMessage("Password should not be more than 30 characters long!"),
];

const sendOtp = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const user = {
      name,
      username,
      email,
      password,
    };

    // Validating inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ success: false, errors: errors.array() });
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

module.exports = { validateUserRegistration, sendOtp };
