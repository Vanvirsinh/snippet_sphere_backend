const bcrypt = require('bcrypt');
const User = require('../../models/auth/userModel');
const { body, validationResult } = require('express-validator');

const passwordValidator = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
}

const validateResetpassword = [
    body('email').isEmail().withMessage('Enter a valid email address!'),
    body('newPassword').custom(passwordValidator).withMessage('Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character!').isLength({ max: 30 }).withMessage("Password should not be more than 30 characters long!")
]

const resetPassword = async (req, res) => {
    try {
        // Validating inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, errors: errors.array() })
        }

        const { email, password, newPassword, confirmNewPassword } = req.body;

        const user = await User.findOne({ email });

        // User verifying
        if (!user) {
            return res.status(404).send({ success: false, message: "No user found with this email!" });
        }

        // Password verifying
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(404).send({ success: false, message: "Oops! Invalid Password!" });
        }

        // Password cros-checking
        if (newPassword !== confirmNewPassword) {
            return res.status(400).send({ success: false, message: "Password mismatch, please re-enter matching passwords!" })
        }

        // Securing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Updating the collection
        await User.updateOne({ email }, { $set: { password: hashedPassword } });
        try {
            return res.status(200).send({ success: true, message: 'Password updated successfully. Please login!' })
        } catch {
            return res.status(400).send({ success: false, message: 'Error occured while updating password!' })
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { resetPassword, validateResetpassword }