const User = require('../models/User');
const sendMail = require('../utils/mailSender');
const bcrypt = require('bcrypt');

exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;

        if(!email) {
            return res.status(400).json({
                success: false,
                message: 'Email Is Required!',
            })
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not registered!',
            })
        }
        let urlToken;
        let existingUser;
        do {
            urlToken = crypto.randomBytes(32).toString("hex");
            existingUser = await User.findOne({urlToken});
        }while(existingUser);

        const hashedToken = crypto.createHash("sha256")
        .update(urlToken)
        .digest("hex");

        const updatedUser = await User.findByIdAndUpdate(user._id, {
            urlToken:hashedToken, resetPasswordExpired: new Date(Date.now() + 5 * 60 * 1000),
        }, {new: true});

        const url = `http://localhost:3000/update-password/${urlToken}`

        // send mail to user which contain url
        await sendMail(user.email, 'Password Reset Link', `Reset Link : ${url}`)
        .then(() => console.log("Mail sent"))
        .catch(err => console.log("Mail error:", err.message));

        // return response 
        return res.status(200).json({
            success: true,
            message: 'Email sent successfully',
            urlToken,
        });
    }catch(err) {
        console.log(`Error in reset password token: ${err}`);
        
        return res.status(500).json({
            succes: false,
            message: 'Error while generate reset password token!'
        })
    }
}

// reset password 
exports.resetPassword = async (req, res) => {
    try {
        const {urlToken, password, confirmPassword } = req.body;
        if(!urlToken || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All field are Required!',
            });
        }

        if(password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password are not same!',
            });
        }
        const hashedToken = crypto
        .createHash("sha256")
        .update(urlToken)
        .digest("hex");

        const user = await User.findOne({urlToken:hashedToken});

        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Url Token',
            });
        }

        if(user.resetPasswordExpired < Date.now()) {
            return res.status(401).json({
                success: false,
                message: 'Invalid url token',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(
            user._id, 
            {password: hashedPassword},
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: 'Password Reset Successfully!',
        });
    }catch(err) {
        console.log(`Error while resetting password: ${err}`);
        
        return res.status(500).json({
            success: false,
            message: 'Error while resetting password!'
        })
    }
}