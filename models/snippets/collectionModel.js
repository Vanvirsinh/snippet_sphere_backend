const mongoose = require('mongoose');
const { getDate } = require('../../utils/date');

const collectionSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    collectionId: {
        type: String,
        uniqe: true
    },
    name: {
        type: String,
        maxLength: 80,
        required: true
    },
    snippets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet'
    }],
    isPublic: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
        default: getDate
    },
    updatedAt: {
        type: String
    }
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;