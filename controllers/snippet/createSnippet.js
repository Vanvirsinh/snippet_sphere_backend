const Snippet = require('../../models/snippets/snippetModel');
const Collection = require('../../models/snippets/collectionModel');
const { getDate } = require('../../utils/date');
const { body, validationResult } = require('express-validator');
const { generateRandomId } = require('../../utils/randomString');

const validateCreateSnippet = [
    body('title').notEmpty().withMessage('Enter snippet title!').isLength({ max: 150 }).withMessage('Title should not be more than 150 characters!'),
    body('code').notEmpty().withMessage("Code can't be empty!"),
    body('language').notEmpty().withMessage('Select a programming language!').isLength({ max: 40 }).withMessage('Language can not be more than 40 characters!'),
    body('description').notEmpty().withMessage('Description can not be empty!').isLength({ max: 1000 }).withMessage('Description can not be more than 1000 characters long!')
];

const checkUniquenessOfId = async (collectionId) => {
    const uniqueId = generateRandomId();
    const exists = await Snippet.exists({ collectionId, snippetId: uniqueId });
    if (exists) {
        return checkUniquenessOfId(collectionId);
    }
    return uniqueId;
}

const createSnippet = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, errors: errors.array() });
        }

        const collection = await Collection.findOne({ authorId: req.user.id, authorName: req.params.username, collectionId: req.params.id });

        if (!collection) {
            return res.status(400).send({ success: false, message: "Please select the collection where you want to store snippet!" });
        }

        const { title, code, language, description, tags, } = req.body;
        const snippetId = await checkUniquenessOfId(collection.collectionId);

        const newSnippet = new Snippet({
            authorId: req.user.id,
            authorName: req.params.username,
            collectionId: collection.collectionId,
            snippetId,
            title,
            code,
            language,
            description,
            tags,
            updatedAt: getDate()
        });

        await newSnippet.save();
        try {
            return res.status(200).send({ success: true, message: 'New Snippet created successfully!' });
        } catch (error) {
            return res.status(400).send({ success: false, message: error.message });
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
}

module.exports = { createSnippet, validateCreateSnippet };