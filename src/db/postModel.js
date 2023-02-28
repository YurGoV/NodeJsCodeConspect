const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // comments: [Object]
});

// const Post = mongoose.model('User', postSchema);
const Post = mongoose.model('Post', postSchema);// 'Post' - назва колекції (в базі вона буде з маленької та у множині - posts


module.exports = {
    Post
};