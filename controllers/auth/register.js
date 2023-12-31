const bcrypt = require('bcrypt');
const User = require('../../models/auth/userModel');
const OTP = require('../../models/auth/otpModel');
const UserProfile = require('../../models/profile/profile');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { getDate } = require('../../utils/date');

const userNameRegExValidator = (value) => {
    const userNameRegex = /^[a-zA-Z\-_]+$/;
    return userNameRegex.test(value);
}

const userNameValidator = async (value) => {

    const user = await User.findOne({ username: value });
    if (user) {
        throw new Error('Username already in use!');
    }
    return true;
}

const emailValidator = async (value) => {
    const email = await User.findOne({ email: value });
    if (email) {
        throw new Error('Email already in use!');
    }
    return true;
}

const passwordValidator = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
}

const validateUserRegistration = [
    body('name').notEmpty().withMessage('Name is required!').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long!').isLength({ max: 30 }).withMessage('Name must be within 30 characters long!'),
    body('username').custom(userNameRegExValidator).withMessage('Username should only contain, letter, hyphens (-), and underscores (_)!').custom(userNameValidator).withMessage('Username already exists!').notEmpty().withMessage("Username is required!").isLength({ min: 3 }).withMessage('Username must be at least 3 characters long!').isLength({ max: 30 }).withMessage('Username must be within 30 characters long!'),
    body('email').isEmail().withMessage("Enter a valid Email address!").custom(emailValidator).withMessage('Email address already exists!'),
    body('password').custom(passwordValidator).withMessage('Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character!').isLength({ max: 30 }).withMessage("Password should not be more than 30 characters long!"),
    body('otp').notEmpty().withMessage('Please Enter your OTP!')
]

const register = async (req, res) => {
    try {
        const { name, username, email, password, otp } = req.body;

        // Validating inputs 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, errors: errors.array() });
        }

        // Validating OTP
        const response = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);

        if (!response) {
            return res.status(400).send({ success: false, message: "OTP is not valid!" });
        }

        if (otp !== response.otp) {
            return res.status(400).send({ success: false, message: "OTP is not valid!" });
        }

        // Securing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, username: username.toLowerCase(), email, password: hashedPassword });

        return user.save().then((newUser) => {
            return jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, async (err, token) => {
                if (err) {
                    return res.status(500).send({ success: false, message: 'Error occurred while generating token!' });
                }

                const newUserProfile = new UserProfile({
                    userId: newUser.id,
                    updatedAt: getDate()
                });

                await newUserProfile.save();
                try {
                    return res.status(200).send({ success: true, message: "You're registered successfully!", token })
                } catch {
                    return res.status(400).send({ success: false, message: 'Error occurred while saving profile!' })
                }
            })
        }).catch(() => res.status(400).send({ success: false, message: 'Error occurred while registering user!' }))

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { register, validateUserRegistration }