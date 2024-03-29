const mongoose = require('mongoose');
const { getDate } = require('../../utils/date');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    personalEmail: {
        type: String,
        default: ''
    },
    websiteUrl: {
        type: String,
        default: ''
    },
    gitHubProfile: {
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