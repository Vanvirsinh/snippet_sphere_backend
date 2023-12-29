const Collection = require('../../models/snippets/collectionModel');
const User = require('../../models/auth/userModel');
const { body, validationResult } = require('express-validator');
const { getDate } = require('../../utils/date');
const { generateRandomId } = require('../../utils/randomString');

const validateCreateCollection = [
    body('name').notEmpty().withMessage('Enter collection name!').isLength({ max: 80 }).withMessage('Collection should not be more than 80 characters!')
]

const checkUniquenessOfId = async (userId) => {
    const uniqueId = generateRandomId();
    const exists = await Collection.exists({ authorId: userId, collectionId: uniqueId });
    if (exists) {
        return checkUniquenessOfId(userId);
    }
    return uniqueId;
}

const createCollection = async (req, res) => {
    try {
        // Validating inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, errors: errors.array() });
        }

        const user = req.user;
        const authorName = await User.findById(user.id).select('username');
        const { name, isPublic } = req.body;
        const collectionId = await checkUniquenessOfId(user.id);

        const newCollection = new Collection({
            authorId: user.id,
            authorName: authorName.username,
            collectionId,
            name,
            isPublic,
            updatedAt: getDate()
        });

        await newCollection.save();
        try {
            return res.status(200).send({ success: true, message: 'New Collection created successfully!' });
        } catch (error) {
            return res.status(400).send({ success: false, message: error.message });
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }

}

module.exports = { createCollection, validateCreateCollection }