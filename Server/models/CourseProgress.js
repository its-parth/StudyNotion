const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        requried: true
    },
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        }
    ]
});

module.exports = mongoose.models.CourseProgress || mongoose.model("CourseProgress", courseProgressSchema);