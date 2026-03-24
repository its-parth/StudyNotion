const { default: mongoose } = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
const sendMail = require('../utils/mailSender');
const {razorpay} = require('../config/razorpay');
const crypto = require("crypto");
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
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
                message: 'User Not Found!',
            });
        }

        // check if already user enrolled in course
        if(course.studentsEnrolled.some(id => id.toString() === userId.toString())) {
            return res.status(409).json({
                success: false,
                message: 'Student is already enrolled!',
            });
        }

        const existingOrder = await Order.findOne({
            userId,
            courseId,
            status: "pending",
        });

        if(existingOrder) {
            return res.status(409).json({
                success: false,
                message: "Payment already initiated",
            });
        }

        const amount = course.price;

        // create db order
        const newOrder = await Order.create({
            userId,
            courseId,
            amount,
            status: "pending",
        });

        // create razorpay order
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: newOrder._id.toString(),
            notes: {
                userId,
                courseId,
            },
        };

        const razorpayOrder = await razorpay.orders.create(options);

        newOrder.orderId = razorpayOrder.id;
        await newOrder.save();

    }catch(err) {
        console.log('Error in create order: ', err);
        return res.status(500).json({
            success: false,
            message: 'Error in capturing payment',
        });
    }
}

exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        // 1 verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

        if(expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature",
            });
        }

        // find order 
        const order = await Order.findOne({orderId: razorpay_order_id});

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        }

        // 3 prevent duplicate
        if(order.status === "success") {
            return res.json({
                success: true,
                message: "Already processed",
            });
        }

        // 4 update order
        order.status = "success";
        order.paymentId = razorpay_payment_id;
        await order.save();
        // todo try to get user id and course id from notes which we add while creating order get notes from response
        // todo currently we are using checkout razorpay and love babbar uses webhook test this then try with webhook
        // 5 enroll user in course
        await User.findByIdAndUpdate(order.userId, {
            $addToSet: {
                enrolledCourses: order.courseId
            }
        });

        // 6 add user to course
        await Course.findByIdAndUpdate(order.courseId, {
            $addToSet: {
                studentsEnrolled: order.userId
            }
        });

        const user = await User.findById(order.userId);
        sendMail(user.email, 'Course Enrollment Confirmation', courseEnrollmentEmail)
                .then(() => console.log("Mail sent"))
                .catch(err => console.log("Mail error:", err.message));

        return res.status(200).json({
            success: true,
            message: "Payment verified and course enrolled!",
        });
    }catch(error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
}