const Course = require('../models/Course');
const Category = require('../models/Category');
const {uploadFileToCloudinary} = require('../utils/cloudinaryUpload');
const User = require('../models/User')
// todo we add status like draft and published to model so modify controller which works on this field like if we fetch all courses it must show courses which are published not drafted one
// todo write getFullCourseDetails, getInstructorCouses, deleteCourse
// getCourseDetails -> preview before buying getFullCourseDetails -> actual content
exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tags, category } = req.body;
        const { thumbnail } = req.files;
        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!',
            })
        }

        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid Category"
            })
        }
        // Todo check type before uploading thumbnail can be img like png jpg jpeg etc but not can be video or gif
        const instructorId = req.user.id;
        const thumbnailUrl = await uploadFileToCloudinary(thumbnail, 'StudyNotion')?.secure_url;

        const course = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorId,
            whatYouWillLearn,
            courseContent:[],
            ratingAndReviews:[],
            price,
            tags,
            thumbnail:thumbnailUrl,
            studentsEnrolled:[],
            category,
        });

        await User.findByIdAndUpdate(
            instructorId,
            {
                $push: {
                    courses: course._id,
                }
            }
        );

        await Category.findByIdAndUpdate(
            category,
            {
                $push: {
                    courses: course._id,
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Course created successfully!',
            course
        })
    }catch(err) {
        console.log(`Error in course creation: ${err}`);
        console.log('i am here 99');
        return res.status(500).json({
            success: false,
            message: 'Server Error while creating course!'
        })
    }
}

// update course handler so that we can modify status from draft to publish and price thumbnail etc.
 
// get all courses handler function
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnroled: true,
            }
        ).populate('instructor').exec();

        return res.status(200).json({
            success: true,
            message: 'All courses fetched successfully!',
            data:courses
        })
    }catch(err) {
        console.log('Error in getting all courses: ', err);
        
        return res.status(500).json({
            success: false,
            message: 'Error While Getting All Courses'
        })
    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        
        if(!courseId) {
            return res.status(400).json({
                success: false,
                message: 'course id is required!',
            })
        }

        const course = await Course.findById(courseId)
        .populate({
            path: 'instructor',
            populate: {
                path: 'additionalDetails',
            }
        })
        .populate('category')
        .populate('ratingAndReviews')
        .populate({
            path: 'courseContent',
            populate: {
                path: 'subSections',
                select: "-videoUrl"
            }
        })
        .exec(); 

        if(!course) {
            return res.status(400).json({
                success: false,
                message: 'Invalid course id',
            })
        }
        // todo update this controller by seeing final code
        return res.status(200).json({
            success: true,
            message: 'Course Details Fetched Successfully!',
            data: course
        })
    }catch(err) {
        console.log('Get course details error: ',err);
        
        return res.status(500).json({
            success: false,
            message: 'Error while getting course details'
        })
    }
}