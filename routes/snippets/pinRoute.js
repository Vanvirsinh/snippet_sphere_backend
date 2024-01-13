const express = require('express');
const router = express.Router();
const { fetchUser } = require('../../middleware/fetchUser');
const { pinSnippet } = require('../../controllers/snippet/pinSnippet');

router.post('/:snippetId', fetchUser, pinSnippet)

module.exports = router;