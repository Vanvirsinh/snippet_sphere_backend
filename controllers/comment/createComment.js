const Comment = require('../../models/snippets/commentModel');
const Snippet = require('../../models/snippets/snippetModel');
const UserProfile = require('../../models/profile/profile');
const User = require('../../models/auth/userModel');
const { body, validationResult } = require('express-validator');
const { getDate } = require('../../utils/date');

const validateInput = [
    body('userComment').isLength({ min: 5 }).withMessage('Enter at minimum 5 characters!').isLength({ max: 500 }).withMessage('Comment can not be more than 500 characters long!')
]

const createComment = async (req, res) => {
    try {
        // Validating Inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, message: errors.array() });
        }

        const { userComment } = req.body;

        const snippet = await Snippet.findById(req.params.snippetId);
        const userName = await User.findById(req.user.id).select('name');
        const userProfileImage = await UserProfile.findOne({ userId: req.user.id }).select('userImage');

        if (!snippet || snippet.length === 0) {
            return res.status(400).send({ success: false, message: 'No snippet found!' });
        }

        const newComment = new Comment({
            userId: req.user.id,
            userName: userName.name,
            userProfileImage: userProfileImage.userImage,
            snippetId: req.params.snippetId,
            userComment,
            updatedAt: getDate()
        });

        const savedComment = await newComment.save();

        snippet.comments.push(savedComment._id);
        await snippet.save();

        return res.status(200).send({ success: true, message: 'Comment addedd successfully!' });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { createComment, validateInput };