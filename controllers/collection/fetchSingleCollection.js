const Collection = require('../../models/snippets/collectionModel');

const fetchSingleCollection = async(req, res) => {
    try {

        let collection;

        if (req.params.username === req.isUserAuthenticated.user) {
            collection = await Collection.findOne({ authorName: req.params.username, collectionId: req.params.id });
        } else {
            collection = await Collection.findOne({ authorName: req.params.username, collectionId: req.params.id, isPublic: true });
        }

        if (!collection || collection.length === 0) {
            return res.status(400).send({ success: false, message: 'Collection not found!' });
        }

        return res.status(200).send({ success: true, collection });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { fetchSingleCollection }