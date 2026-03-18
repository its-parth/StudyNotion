const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    rating: {
        type: Number,
        require: true,
    },
    review: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);