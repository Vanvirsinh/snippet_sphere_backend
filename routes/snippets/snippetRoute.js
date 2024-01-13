const express = require('express');
const router = express.Router();
const { createSnippet, validateCreateSnippet } = require('../../controllers/snippet/createSnippet');
const { fetchUser } = require('../../middleware/fetchUser');
const { fetchAllSnippets } = require('../../controllers/snippet/fetchAllSnippets');
const { fetchUserSpecificSnippet, isAuthenticated } = require('../../controllers/snippet/fetchUserSpecificSnippet');
const { fetchSingleSnippet } = require('../../controllers/snippet/fetchSingleSnippet');
const { fetchCollectionSpecificSnippet } = require('../../controllers/snippet/fetchCollectionSpecificSnippet');
const { validateUpdateSnippet, updateSnippet } = require('../../controllers/snippet/updateSnippet');
const { deleteSnippet } = require('../../controllers/snippet/deleteSnippet');
const { changeSnippetCollection } = require('../../controllers/snippet/changeSnippetCollection');
const { pinnedSnippets } = require('../../controllers/snippet/fetchPinnedSnippet');

router.post('/:username/:id', fetchUser, validateCreateSnippet, createSnippet);
router.get('/', fetchAllSnippets);
router.get('/pinned-snippets/:username', fetchUser, pinnedSnippets);
router.get('/:username', isAuthenticated, fetchUserSpecificSnippet);
router.get('/:username/collection/:collectionId', isAuthenticated, fetchCollectionSpecificSnippet);
router.get('/:username/:snippetId', isAuthenticated, fetchSingleSnippet);
router.put('/update/:id', fetchUser, validateUpdateSnippet, updateSnippet);
router.put('/update-collection/:collectionId/:snippetId', fetchUser, changeSnippetCollection);
router.delete('/delete/:id', fetchUser, deleteSnippet);

module.exports = router;