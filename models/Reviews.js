const mongoose = require('mongoose');

const Reviews = mongoose.model('Reviews', {
    title: { type: String },
    reviews: { type: String },
    game_id: { type: String },
    date: { type: Object },
    username: { type: String },
    count: { type: Number },
    avatar_user: { type: Object },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = Reviews;