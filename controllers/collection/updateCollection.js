const Collection = require('../../models/snippets/collectionModel');
const { body, validationResult } = require('express-validator');
const { getDate } = require('../../utils/date');

const validateUpdateCollection = [
    body('name').notEmpty().withMessage('Enter collection name!').isLength({ max: 80 }).withMessage('Collection should not be more than 80 characters!')
]

const updateCollection = async (req, res) => {
    try {
        // Validating inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, errors: errors.array() });
        }

        const { name, isPublic } = req.body;

        const collection = await Collection.findOne({ _id: req.params.id, authorId: req.user.id });

        if(!collection) {
            return res.status(400).send({ success: false, message: 'Collection not found!' });
        }

        // Update the collection
        await Collection.updateOne({ _id: req.params.id }, { $set: { name, isPublic, updatedAt: getDate() } });
        try {
            return res.status(201).send({ success: true, message: 'Collection updated successfully!' });
        } catch (error) {
            return res.status(400).send({ success: false, message: error.message });
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { updateCollection, validateUpdateCollection };