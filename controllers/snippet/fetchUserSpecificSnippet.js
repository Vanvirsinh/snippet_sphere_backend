const Snippet = require('../../models/snippets/snippetModel');
const User = require('../../models/auth/userModel');
const Collection = require('../../models/snippets/collectionModel');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            req.isUserAuthenticated = { auth: false, user: null }
            return next();
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        const username = await User.findById(user.id).select('username');
        if (!username) {
            req.isUserAuthenticated = { auth: false, user: null }
            return next();
        }
        req.isUserAuthenticated = { auth: true, user: username.username }
        return next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

}

const fetchUserSpecificSnippet = async (req, res) => {
    try {

        let snippets;

        if (req.params.username === req.isUserAuthenticated.user) {
            snippets = await Snippet.find({ authorName: req.params.username });
        } else {
            const collections = await Collection.find({ authorName: req.params.username, isPublic: true }).select('collectionId');
            if (!collections) {
                return res.status(400).send({ success: false, message: 'Public collections not found for this user!' });
            }
            const collectionIds = collections.map(id => id.collectionId);
            snippets = await Snippet.find({ collectionId: { $in: collectionIds } });
        }

        if (!snippets || snippets.length === 0) {
            return res.status(400).send({ success: false, message: 'Snippets not found for this user!' });
        }
        return res.status(200).send({ success: true, snippets });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

}

module.exports = { fetchUserSpecificSnippet, isAuthenticated }