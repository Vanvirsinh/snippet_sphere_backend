const mongoose = require('mongoose');
const { getDate } = require('../../utils/date');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String
    },
    userProfileImage: {
        type: String,
    },
    snippetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet'
    },
    userComment: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: getDate
    },
    updatedAt: {
        type: String
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;