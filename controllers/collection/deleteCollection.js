const Collection = require('../../models/snippets/collectionModel');
const Snippet = require('../../models/snippets/snippetModel');

const deleteCollection = async (req, res) => {

    try {

        const collection = await Collection.findOne({ _id: req.params.id, authorId: req.user.id });

        if (!collection) {
            return res.status(400).send({ success: false, message: 'Collection not found!' });
        }

        const snippets = await Snippet.find({ collectionId: req.params.id });

        if (!snippets || snippets.length === 0) {
            await Collection.findByIdAndDelete(req.params.id);
            return res.status(200).send({ success: true, message: 'Collection deleted successfully!' });
        }

        return res.status(400).send({ success: false, message: 'Only Empty collection can be deleted!'});


    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }

}

module.exports = { deleteCollection };