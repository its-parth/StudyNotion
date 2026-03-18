// This Handler is basically to handle 4 things 1)send otp 2)signin 3)login 4)forgot password
const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/mailSender');
const {otpTemplate} = require('../mail/templates/emailVerificationTemplate');

const generateOTP = (len = 6) => {
    const min = 10 ** (len - 1);
    const max = 10 ** len;
    return Math.floor(min + Math.random() * (max - min));
}

const sendVerificationEmail = async (email, otp) => {
    try {
        await sendMail(email, 'Verification Email From CodeXpertise', otpTemplate(otp));
        console.log('Email Sent Successfully!');
        
    }catch(err) {
        console.log(`Error while sending otp via email`);
        throw err;
    }
}

// send OTP
exports.sendOTP = async (req, res) => {
    try {
        // fetching email
        const { email } = req.body;

        // validation 
        if(!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required!',
            })
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered!',
            })
        }

        // generate otp 
        const otp = generateOTP();
        await OTP.create({ email, otp });
        
        await sendVerificationEmail(email, otp);
        return res.status(201).json({
            success: true,
            message: 'OTP Sent Successfully!',
            otp,
        })
    }catch(err) {
        console.log(`Error while sending otp: ${err}`);
        return res.status(500).json({
            success: false,
            message: `Error while sending OTP`,
        })
    }
}
