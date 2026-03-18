const mongoose = require('mongoose');

const subSectionSchema = new mongoose.model({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true,
    },
    additionalUrl: {
        type: String,   
    },
});

module.exports = mongoose.model("SubSection", subSectionSchema)