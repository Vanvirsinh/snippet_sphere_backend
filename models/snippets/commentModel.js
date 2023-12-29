const mongoose = require('mongoose');
const { getDate } = require('../../utils/date');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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