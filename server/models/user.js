const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    dateOfBirth: {
        type: String
    },
    email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);