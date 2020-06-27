const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Follow = require("./follow.model");

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // Used as a unique id for authentication
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false,
        default: " "
    },
    // Sensitive information
    password: {
        type: String,
        required: true
    },
    // Sensitive information
    date_created: {
        type: Date,
        default: Date.now
    },
    following: [{ type: Schema.ObjectId }],
    followers: [{ type: Schema.ObjectId }],
});

module.exports = User = mongoose.model('User', UserSchema);