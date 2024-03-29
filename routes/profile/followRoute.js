const express = require('express');
const router = express.Router();
const { fetchUser } = require('../../middleware/fetchUser');
const { followUser } = require('../../controllers/profile/followUser');

router.post('/:username', fetchUser, followUser);

module.exports = router;