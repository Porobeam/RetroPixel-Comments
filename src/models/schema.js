const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    author: { type: String, required: false },
    comment: { type: String, required: false },
    color: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
