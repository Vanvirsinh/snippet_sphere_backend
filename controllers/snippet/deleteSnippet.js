const Snippet = require('../../models/snippets/snippetModel');

const deleteSnippet = async (req, res) => {
    try {

        const snippet = await Snippet.findOne({ _id: req.params.id, authorId: req.user.id });

        if(!snippet) {
            return res.status(400).send({ success: false, message: 'Snippet not found!' })
        }

        await Snippet.deleteOne({_id: req.params.id, authorId: req.user.id});
        
        try {
            return res.status(200).send({ success: true, message: 'Collection deleted successfully!' });
        } catch (error) {
            return res.status(400).send({ success: false, message: error.message });
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { deleteSnippet };