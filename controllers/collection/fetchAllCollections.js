const Collection = require('../../models/snippets/collectionModel');

const fetchAllCollections = async (req, res) => {
    try {
        const allCollections = await Collection.find({ isPublic: true });

        try {
            if (!allCollections) {
                return res.status(400).send({ success: false, message: 'There is no public collection available!' });
            }
            return res.status(200).send({ success: true, collections: allCollections });
        } catch (error) {
            return res.status(500).send({ success: false, message: error.message });
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { fetchAllCollections };