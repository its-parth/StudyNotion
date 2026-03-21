const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const mongoose = require('mongoose');

exports.createRatingAndReview = async (req, res) => {
    try {
        const { rating, review, courseId } = req.body;
        // rating == undefined bcoz rating can be 0
        if(rating == undefined || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if(rating < 0 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5',
            })
        }

        if(!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Course Id',
            });
        }

        const alreadyReviewed = await RatingAndReview.exists({
            user: req.user.id,
            course: courseId
        });

        if(alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this course'
            })
        }

        // check that user is enrolled in that course
        const isEnrolled = await Course.exists({_id: courseId, studentsEnrolled: req.user.id});

        if(!isEnrolled) {
            return res.status(400).json({
                success: false,
                message: 'you is not enrolled to this course'
            });
        }

        const ratingAndReview = await RatingAndReview.create({
            user:req.user.id, rating, review, course:courseId
        });

        if(!ratingAndReview) {
            return res.status(500).json({
                success: false,
                message: 'Error in creating rating and review'
            });
        }

        // update course
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push: {
                ratingAndReviews: ratingAndReview._id
            }
        },
        {new: true}
        );

        if(!updatedCourse) {
            return res.status(500).json({
                success: false,
                message: 'Error in creating rating and review'
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Rating And Review Created Successfully!'
        });
    }catch(err) {
        console.log('Error in creating rating and review: ', err);
        
        return res.status(500).json({
            success: false,
            message: 'Error in creating rating and review'
        });
    }
}


exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;

        if(!courseId) {
            return res.status(400).json({
                success: false,
                message: 'Course id is required',
            });
        }

        if(!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid course id',
            });
        }

        // get average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"},
                    totalReviews: {$sum: 1},
                }
            }
        ]);
        return res.status(200).json({
            success: true,
            message: 'Average rating calculated!',
            averageRating: result[0]?.averageRating || 0,
            totalReviews: result[0]?.totalReviews || 0
        });
    }catch(err) {
        console.log('Error in getting average rating: ', err);
        
        return res.status(500).json({
            success: false,
            message: 'Error in getting average rating'
        });
    }
}


exports.getAllRatingAndReview = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNum = Number(page);
        const limitNum = Number(limit);

        if(pageNum < 1 || limitNum < 1) {
            return res.status(400).json({
                success: false,
                message: 'Page and limit must be greater than 0'
            });
        }

        const allReviews = await RatingAndReview.find({})
        .sort({ createdAt: -1 })
        .skip((page -1 ) * limit)
        .limit(Number(limit))
        .populate({
            path: 'user',
            select: "firstName lastName email image",
        })
        .populate({
            path: 'course',
            select: 'courseName',
        });

        const totalReviews = await RatingAndReview.countDocuments();
        const totalPages = Math.ceil(totalReviews / limitNum);

        return res.status(200).json({
            success: true,
            message: 'All rating and reviews fetched successfully',
            totalReviews,
            currentPage: Number(page),
            data: allReviews
        });
    }catch(err) {
        console.log('Error in getting all rating and review: ', err);
        
        return res.status(500).json({
            success: false,
            message: 'Error in getting all rating and review'
        });
    }
}