const Snippet = require('../../models/snippets/snippetModel');
const { getDate } = require('../../utils/date');
const { body, validationResult } = require('express-validator');

const validateUpdateSnippet = [
    body('title').notEmpty().withMessage('Enter snippet title!').isLength({ max: 150 }).withMessage('Title should not be more than 150 characters!'),
    body('code').notEmpty().withMessage("Code can't be empty!"),
    body('language').notEmpty().withMessage('Select a programming language!').isLength({ max: 40 }).withMessage('Language can not be more than 40 characters!'),
    body('description').notEmpty().withMessage('Description can not be empty!').isLength({ max: 1000 }).withMessage('Description can not be more than 1000 characters long!')
]

const updateSnippet = async (req, res) => {
    try {
        // Validating inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, errors: errors.array() });
        }

        const { title, code, language, description } = req.body;

        // Update the snippet
        await Snippet.updateOne({ _id: req.params.id }, { $set: { title, code, language, description, updatedAt: getDate() } });
        try {
            return res.status(201).send({ success: true, message: 'Snippet updated successfully!' });
        } catch (error) {
            return res.status(400).send({ success: false, message: error.message });
        }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = { updateSnippet, validateUpdateSnippet }