const { default: mongoose } = require('mongoose');
const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const sendMail = require('../utils/mailSender');

// capture the payment and initiate the razorpay order
exports.createOrder = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if(!courseId || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Course Id and User Id Required!',
            });
        }

        if(!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid course or user id'
            });
        }

        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                success: false,
                message: 'Course Not Found!',
            });
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'Usre Not Found!',
            });
        }


    }catch(err) {
        console.log('Error in capture payment: ', err);
        return res.status(500).json({
            success: false,
            message: 'Error in capturing payment',
        });
    }
}

const crypto = require("crypto");

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Payment is valid

      // 👉 Update DB here
      // await Order.findByIdAndUpdate(...)

      return res.json({
        success: true,
        message: "Payment verified",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
};