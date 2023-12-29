const Snippet = require('../../models/snippets/snippetModel');
const Collection = require('../../models/snippets/collectionModel');

const fetchAllSnippets = async (req, res) => {
    try {

        const allCollections = await Collection.find({ isPublic: true }).select('_id');

        try {
            if (!allCollections) {
                return res.status(400).send({ success: false, message: 'There is no public collection available!' });
            }

            const allCollectionsIds = allCollections.map(id => id._id);
            const allSnippets = await Snippet.find({ collectionId: { $in: allCollectionsIds } });

            if(!allSnippets) {
                return res.status(400).send({ success: false, message: 'There is not public snippet availabe!' });
            }

            return res.status(200).send({ success: true, snippets: allSnippets });

        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { fetchAllSnippets }