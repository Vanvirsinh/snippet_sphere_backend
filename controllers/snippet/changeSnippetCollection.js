const Snippet = require('../../models/snippets/snippetModel');
const Collection = require('../../models/snippets/collectionModel');

const changeSnippetCollection = async (req, res) => {
    try {
        
        const collectionToBeChanged = await Collection.findOne({ collectionId: req.params.collectionId, authorId: req.user.id });

        if(!collectionToBeChanged || collectionToBeChanged.length === 0) {
            return res.status(400).send({ success: false, message: "No collection found to be changed!" });
        }
        
        await Snippet.findByIdAndUpdate(req.params.snippetId, { $set: { collectionId: collectionToBeChanged._id } });
        try {
            return res.status(200).send({ success: true, message: 'Snippet shifted to another collection!' });
        } catch (error) {
            return res.status(400).send({ success: false, message: error.message });
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { changeSnippetCollection };