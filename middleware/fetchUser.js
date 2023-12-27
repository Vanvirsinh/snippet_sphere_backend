const jwt = require('jsonwebtoken');

const fetchUser = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ success: false, message: 'You are not authenticated, please login or register!' })
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Oops, Some Internal Error Occurred!' });
    }
}

module.exports = { fetchUser }