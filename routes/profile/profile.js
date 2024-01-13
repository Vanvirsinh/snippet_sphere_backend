const express = require('express');
const router = express.Router();
const { addProfile, validateAddProfile } = require('../../controllers/profile/addProfile');
const { getUserProfile } = require('../../controllers/profile/getUserProfile');
const { fetchUser } = require('../../middleware/fetchUser');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Storage engine set-up
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Check file type
function fileType(file, cb) {
  const filetypes = /png|jpg|jpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    cb("Please upload images only");
  }
}

// Multer middleware
const upload = multer({ storage });

router.post('/add-profile', fetchUser, upload.single('file'), validateAddProfile, addProfile);
router.get('/:username', getUserProfile);

module.exports = router;