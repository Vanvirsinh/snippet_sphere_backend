const Comment = require('../../models/snippets/commentModel');
const { getDate } = require('../../utils/date');
const { validationResult } = require("express-validator");

const updateComment = async (req, res) => {
    try {
        // Validating Inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, message: errors.array() });
        }

        const { userComment } = req.body;
        const commentId = req.params.commentId;

        const comment = await Comment.findOne({_id: commentId, userId: req.user.id});

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await Comment.updateOne({ _id: req.params.commentId, userId: req.user.id }, { $set: { userComment, updatedAt: getDate() } });
      
        return res.status(200).send({ success: true, message: 'Comment updated successfully!' });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { updateComment }