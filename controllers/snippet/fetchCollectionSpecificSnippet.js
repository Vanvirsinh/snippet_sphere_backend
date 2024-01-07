const Snippet = require('../../models/snippets/snippetModel');
const Collection = require('../../models/snippets/collectionModel');

const fetchCollectionSpecificSnippet = async (req, res) => {
    try {

        let snippets;

        if (req.params.username === req.isUserAuthenticated.user) {
            let collectionObjectId = await Collection.findOne({ collectionId: req.params.collectionId, authorName: req.params.username }).select('collectionId');
            if (collectionObjectId) {
                snippets = await Snippet.find({ collectionId: collectionObjectId.collectionId });
            }
        } else {
            let collectionObjectId = await Collection.findOne({ collectionId: req.params.collectionId, authorName: req.params.username, isPublic: true }).select('collectionId');
            if (collectionObjectId) {
                snippets = await Snippet.find({ collectionId: collectionObjectId.collectionId });
            }
        }

        if (!snippets || snippets.length === 0) {
            return res.status(400).send({ success: false, message: 'Snippets not found for this collection!' });
        }
        return res.status(200).send({ success: true, snippets });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { fetchCollectionSpecificSnippet }