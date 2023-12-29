const express = require('express');
const router = express.Router();
const { addProfile, validateAddProfile } = require('../../controllers/profile/addProfile');
const { getUserProfile } = require('../../controllers/profile/getUserProfile');
const { fetchUser } = require('../../middleware/fetchUser');

router.post('/add-profile', fetchUser, validateAddProfile, addProfile);
router.get('/:id', getUserProfile);

module.exports = router;