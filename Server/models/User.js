const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    accountType: {
        type: String,
        enum: ['Student', 'Instructor', 'Admin'],
        required: true,
    },
    active: {
        type: Boolean, 
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    courses: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    image: {
        type: String,
        required: true,
    },
    urlToken: {
        type: String,
    },
    resetPasswordExpired: {
        type: Date,
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseProgress',
        }
    ],
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);