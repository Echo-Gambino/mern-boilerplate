const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FollowSchema = new Schema({
    follower_id: { type: Schema.ObjectId },
    followee_id: { type: Schema.ObjectId },
});

module.exports = Follow = mongoose.model('Follow', FollowSchema);