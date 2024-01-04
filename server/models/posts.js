const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    name: String,
    category: String,
    about: String,
    image: String,
    privacy: String,
    theme: String,
    allowedVisitor: [],
    createdBy: String,
    tributes: [],
    gallery: [],
    donation: [],
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Post', postSchema);