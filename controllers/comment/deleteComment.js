const Comment = require('../../models/snippets/commentModel');
const Snippet = require('../../models/snippets/snippetModel');

const deleteComment = async (req, res) => {
    try {

        const commentId = req.params.commentId;

        const comment = await Comment.findOne({_id: commentId, userId: req.user.id});

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await Comment.findByIdAndDelete(commentId);

        const snippet = await Snippet.findOneAndUpdate(
            { comments: commentId },
            { $pull: { comments: commentId } },
            { new: true }
        );

        if (!snippet) {
            return res.status(404).json({ message: 'Associated snippet not found' });
        }
      
        return res.status(200).send({ success: true, message: 'Comment deleted successfully!' });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { deleteComment }