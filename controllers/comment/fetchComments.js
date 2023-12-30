const Snippet = require('../../models/snippets/snippetModel');

const fetchComments = async (req, res) => {
    try {
        const snippetId = req.params.snippetId;

        const snippet = await Snippet.findById(snippetId).populate({
            path: 'comments',
            select: '-_id'
        });

        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found' });
        }

        return res.status(200).json(snippet.comments);
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { fetchComments }