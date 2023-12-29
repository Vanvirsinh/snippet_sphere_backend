const express = require('express');
const router = express.Router();
const { createSnippet, validteCraeteSnippet } = require('../../controllers/snippet/createSnippet');
const { fetchUser } = require('../../middleware/fetchUser');
const { fetchAllSnippets } = require('../../controllers/snippet/fetchAllSnippets');

router.post('/:username/:id', fetchUser, validteCraeteSnippet, createSnippet);
router.get('/', fetchAllSnippets);

module.exports = router;