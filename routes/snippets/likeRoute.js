const express = require('express');
const router = express.Router();
const { fetchUser } = require('../../middleware/fetchUser');
const { likeSnippet } = require('../../controllers/snippet/likeSnippet');

router.post('/:snippetId', fetchUser, likeSnippet)

module.exports = router;