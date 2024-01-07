const Snippet = require('../../models/snippets/snippetModel');
const Collection = require('../../models/snippets/collectionModel');

const fetchSingleSnippet = async (req, res) => {
    try {

        let snippet; 

        if(req.params.username === req.isUserAuthenticated.user) {
            snippet = await Snippet.find({ snippetId: req.params.snippetId });
        } else {
            const collections = await Collection.find({ authorName: req.params.username, isPublic: true }).select('collectionId');
            if (!collections) {
                return res.status(400).send({ success: false, message: 'Public collections not found for this user!' });
            }
            const collectionIds = collections.map(id => id.collectionId);
            snippet = await Snippet.find({ collectionId: { $in: collectionIds }, snippetId: req.params.snippetId });
        }

        if (!snippet || snippet.length === 0) {
            return res.status(400).send({ success: false, message: 'Snippet not found for this user!' });
        }
        return res.status(200).send({ success: true, snippet });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { fetchSingleSnippet };