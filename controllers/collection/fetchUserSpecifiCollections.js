const Collection = require('../../models/snippets/collectionModel');
const User = require('../../models/auth/userModel');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        
        if (token === undefined || token === null) {
            req.isUserAuthenticated = { auth: false, user: null };
            return next();
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const username = await User.findById(user.id).select('username');
        if (!username) {
            req.isUserAuthenticated = { auth: false, user: null };
            return next();
        }
        req.isUserAuthenticated = { auth: true, user: username.username };
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const fetchUserSpecifiCollections = async (req, res) => {
    try {

        let collections;

        if (req.params.username === req.isUserAuthenticated.user) {
            collections = await Collection.find({ authorName: req.params.username });
        } else {
            collections = await Collection.find({ authorName: req.params.username, isPublic: true });
        }

        if (!collections || collections.length === 0) {
            return res.status(400).send({ success: false, message: 'Collections not found for this user!' });
        }

        return res.status(200).send({ success: true, collections });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { fetchUserSpecifiCollections, isAuthenticated }