const Profile = require('../models/Profile');
const RatingAndReview = require('../models/RatingAndReview');
const { uploadFileToCloudinary } = require('../utils/cloudinaryUpload');
const Course = require('../models/Course');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    try {
        const { dateOfBirth, about, contactNumber, gender } = req.body;
        // todo add validation for contactNumber gender 

        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const profileId = user.additionalDetails;
        const profile = await Profile.findById(profileId);

        if(!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile Not Found',
            })
        }
        const updatedData = {};
        if(dateOfBirth) {
            const parsedDate = new Date(dateOfBirth);

            if(isNaN(parsedDate)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid date format',
                });
            }

            updatedData.dateOfBirth = parsedDate;
        }
        if(contactNumber) updatedData.contactNumber = contactNumber;
        if(gender) updatedData.gender = gender;
        if(about) updatedData.about = about;

        if(Object.keys(updatedData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No data provided to update'
            });
        }

        // update profile
        await Profile.findByIdAndUpdate(profile._id, updatedData, { new: true });

        const updatedUser = await User.findById(req.user.id).populate('additionalDetails');

        return res.status(200).json({
            success: true,
            message: 'User Profile updated successfully!',
            user: updatedUser
        });
    }catch(err) {
        console.log('Error in updating profile: ', err);
        return res.status(500).json({
            success: false,
            message: 'Error in updating profile',
        });
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        // delete profile, remove from enrolled students in course, delete user review and then delete user
        // Todo: what if user is instructor should we remove course and if course remove we update enrolledCourses of all students 
        
        await Profile.findByIdAndDelete(user.additionalDetails);

        await Course.updateMany(
            {enrolledStudents: user._id},
            {
                $pull: {
                    enrolledStudents: user._id
                }
            }
        );
        
        
        const userReviews = await RatingAndReview.find({ user: user._id });
        
        const reviewIds = userReviews.map(review => review._id);
        
        // remove from course
        if(reviewIds.length > 0) {
            await Course.updateMany(
                { ratingAndReviews: { $in: reviewIds }},
                {
                    $pull: { 
                        ratingAndReviews: { $in: reviewIds }
                    }
                }
            );
        }

        await RatingAndReview.deleteMany({ user: user._id });
        
        // below code is given by chatgpt but our model don't have average rating so i commented but code is good for knowledge
        // // recalculate ratings
        // const affectedCourses = [...new Set(userReviews.map(r => r.course.toString()))];

        // for(const courseId of affectedCourses) {
        //     const result = await RatingAndReview.aggregate([
        //         { $match: { course: new mongoose.Types.ObjectId(courseId) } },
        //         {
        //             $group: {
        //                 _id: null,
        //                 averageRating: { $avg: "$rating" }
        //             }
        //         }
        //     ]);

        //     await Course.findByIdAndUpdate(courseId, {
        //         averageRating: result[0]?.averageRating || 0
        //     });
        // }

        await User.findByIdAndDelete(user._id);

        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully!',
        })
    }catch(err) {
        console.log('Error in deleting account: ', err);
        
        return res.status(500).json({
            success: false,
            message: 'Error in deleting account',
        });
    }
}

exports.getUserAllDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        .select("-password")
        .populate("additionalDetails")
        .lean();

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user
        });
    }catch(err) {
        console.log('Error in getting user all Details: ', err);
        return res.status(500).json({
            success: false,
            message: 'Error in getting user all Details',
        });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        .select("-password")
        .populate({
            path: "courses",
            select: "courseName thumbnail courseContent",
            populate: {
                path: "courseContent",
                select: "sectionName subSections",
                populate: {
                    path: "subSections",
                    select: "title timeDuration"
                }
            }
        })
        .lean();

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        const courses = user.courses;

        return res.status(200).json({
            success: true,
            message: 'Enrolled courses fetch successfully!',
            data: courses,
        });

    }catch(err) {
        console.log('Error in getting enrolled courses: ', err);
        return res.status(500).json({
            success: false,
            message: 'Error in getting enrolled courses',
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        // todo check file type
        const displayPicture = req.files.displayPicture;
        // find what is 1000 & 1000 what is the use of it and if it is width and height handle it properly also see crop: "fill"....
        const image = await uploadFileToCloudinary(
            displayPicture,
            'StudyNotion',
            1000,
            1000
        );

        if(!image) {
            return res.status(500).json({
                success: false,
                message: 'Error while uploading image to cloudinary'
            });
        }
        
        await User.findByIdAndUpdate(req.user.id,
            { image: image.secure_url },
            { new: true }
        )
        
        const user = await User.findById(req.user.id)
        .select("-password")
        .lean();

        return res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data: user,
        });
    }catch(err) {
        console.log('Error in updating display picture: ', err);
        return res.status(500).json({
            success: false,
            message: 'Error in updating display picture',
        });
    }
}