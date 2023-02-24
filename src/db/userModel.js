const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    password: {
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
const User = mongoose.model('User', userSchema);// 'Post' - назва колекції (в базі вона буде з маленької та у множині - posts


module.exports = {
    User
};