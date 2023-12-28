const express = require('express');
const router = express.Router();
const { addProfile, validateAddProfile } = require('../../controllers/profile/addProfile');
const { getUserProfile } = require('../../controllers/profile/getUserProfile');

router.post('/add-profile', validateAddProfile, addProfile);
router.get('/', getUserProfile);

module.exports = router;