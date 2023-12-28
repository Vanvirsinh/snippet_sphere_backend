const mongoose = require('mongoose');
const { getDate } = require('../../utils/date');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming reference to the user document
        required: true,
        unique: true
    },
    userImage: {
        type: String,
        default: ''
    },
    headline: {
        type: String,
        default: ''
    },
    followers: {
        type: Number,
        default: 0
    },
    personalEmail: {
        type: String
    },
    websiteUrl: {
        type: String,
        default: ''
    },
    GitHubProfile: {
        type: String,
        default: ''
    },
    createdAt: {
        type: String,
        default: getDate
    },
    updatedAt: {
        type: String
    }
});

const UserProfile = mongoose.model("UserProfile", profileSchema);

module.exports = UserProfile;