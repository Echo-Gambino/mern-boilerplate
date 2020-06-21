const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false,
        default: " "
    },
    password: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);