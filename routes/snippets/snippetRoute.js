const express = require('express');
const router = express.Router();
const { createSnippet, validteCraeteSnippet } = require('../../controllers/snippet/createSnippet');
const { fetchUser } = require('../../middleware/fetchUser');
const { fetchAllSnippets } = require('../../controllers/snippet/fetchAllSnippets');
const { fetchUserSpecificSnippet, isAuthenticated } = require('../../controllers/snippet/fetchUserSpecificSnippet');
const { fetchSingleSnippet } = require('../../controllers/snippet/fetchSingleSnippet');
const { validateUpdateSnippet, updateSnippet } = require('../../controllers/snippet/updateSnippet');
const { deleteSnippet } = require('../../controllers/snippet/deleteSnippet');

router.post('/:username/:id', fetchUser, validteCraeteSnippet, createSnippet);
router.get('/', fetchAllSnippets);
router.get('/:username', isAuthenticated, fetchUserSpecificSnippet);
router.get('/:username/:snippetId', isAuthenticated, fetchSingleSnippet);
router.put('/update/:id', fetchUser, validateUpdateSnippet, updateSnippet);
router.delete('/delete/:id', fetchUser, deleteSnippet);

module.exports = router;