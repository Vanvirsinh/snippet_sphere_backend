const express = require('express');
const router = express.Router();
const { createCollection, validateCreateCollection } = require('../../controllers/collection/createCollection');
const { fetchUser } = require('../../middleware/fetchUser');
const { fetchAllCollections } = require('../../controllers/collection/fetchAllCollections');
const { fetchUserSpecifiCollections, isAuthenticated } = require('../../controllers/collection/fetchUserSpecifiCollections');
const { updateCollection, validateUpdateCollection } = require('../../controllers/collection/updateCollection');
const { deleteCollection } = require('../../controllers/collection/deleteCollection');
const { fetchSingleCollection } = require('../../controllers/collection/fetchSingleCollection');

router.post('/', fetchUser, validateCreateCollection, createCollection);
router.get('/', fetchAllCollections);
router.put('/update/:id', fetchUser, validateUpdateCollection, updateCollection);
router.delete('/delete/:id', fetchUser, deleteCollection);
router.get('/:username', isAuthenticated, fetchUserSpecifiCollections);
router.get('/:username/:id', isAuthenticated, fetchSingleCollection);

module.exports = router;