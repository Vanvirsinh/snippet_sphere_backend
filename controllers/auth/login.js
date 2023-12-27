const User = require('../../models/auth/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const validateUserLogin = [
    body('email').isEmail().withMessage('Enter a valid Email address!'),
    body('password').exists().withMessage('Password is required!')
]

const login = async (req, res) => {

    try {
        // Validatating inputs 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ success: false, message: "Oops! Invalid Credentials!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(404).send({ success: false, message: "Oops! Invalid Credentials!" });
        }

        jwt.sign({ id: user.id }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                return res.status(500).send({ success: false, message: 'Error occured while generating token!' });
            }
            return res.status(200).send({ success: true, message: "You've logged in successfully!", token })
        });
        
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { login, validateUserLogin }