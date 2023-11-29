const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const PostSChema = new Schema({
    title: {
        type: String,
        reqired: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSChema);

module.exports = Post;