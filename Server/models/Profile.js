const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    dateOfBirth: {
        type: Date, 
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
    }
});

module.exports = mongoose.models.Profile || mongoose.model("Profile", profileSchema);