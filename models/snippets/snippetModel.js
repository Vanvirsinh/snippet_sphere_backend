const mongoose = require('mongoose');
const { getDate } = require('../../utils/date');

const snippetSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    snippetId: {
        type: String,
        uniqe: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    description: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: String,
        default: getDate
    },
    updatedAt: {
        type: String
    }
});

const Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;