const express = require('express');
const router = express.Router();
const { fetchUser } = require('../../middleware/fetchUser');
const { createComment, validateInput } = require('../../controllers/comment/createComment');
const { fetchComments } = require('../../controllers/comment/fetchComments');
const { updateComment } = require('../../controllers/comment/updateComment');
const { deleteComment } = require('../../controllers/comment/deleteComment');

router.post('/:snippetId', fetchUser, validateInput, createComment);
router.get('/:snippetId', fetchComments);
router.put('/update/:commentId', fetchUser, validateInput, updateComment);
router.delete('/delete/:commentId', fetchUser, deleteComment);

module.exports = router;