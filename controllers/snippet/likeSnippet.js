const Snippet = require('../../models/snippets/snippetModel');

const likeSnippet = async (req, res) => {
    try {
        const likingUserId = req.user.id;

        const snippetsToLike = await Snippet.findById(req.params.snippetId);

        if (!snippetsToLike) {
            return res.status(404).send({ success: false, message: 'Snippet not found' });
        }

        if (snippetsToLike.likes.includes(likingUserId)) {
            snippetsToLike.likes.pop(likingUserId);
        } else {
            snippetsToLike.likes.push(likingUserId);
        }

        await snippetsToLike.save();
        try {
            return res.status(201).send({ success: true, message: 'Snippet Liked!' })
        } catch (error) {
            return res.status(400).send({ success: false, message: error.message })
        }


    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { likeSnippet };