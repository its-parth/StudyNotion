const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: Number, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    },
    // todo add attempts limit logic
    attempts: {
        type: Number, 
        default: 0
    }
});

module.exports = mongoose.model("OTP", OTPSchema);