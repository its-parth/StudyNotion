const Course = require('../models/Course');
const Category = require('../models/Category');
const {uploadFileToCloudinary} = require('../utils/cloudinaryUpload');

exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatWillYouLearn, price, tags, category } = req.body;
        const { thumbnail } = req.files;

        // validation
        if(!courseName || !courseDescription || !whatWillYouLearn || !price || !category || !thumbnail) {
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
            whatWillYouLearn,
            courseContent:[],
            ratingAndReviews:[],
            price,
            tags,
            thumbnail:thumbnailUrl,
            studentsEnrolled:[],
            category,
        });

        await User.findByIdAndUpdate(
            user._id,
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
    
        return res.status(500).json({
            success: false,
            message: 'Server Error while creating course!'
        })
    }
}
 
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
            path: instructor,
            populate: {
                path: 'additionalDetails',
            }
        })
        .populate('category')
        .populate('ratingAndReviews')
        .populate({
            path: 'courseContent',
            poulate: {
                path: 'subSection',
            }
        })
        .exec();

        if(!course) {
            return res.status(400).json({
                success: false,
                message: 'Invalid course id',
            })
        }

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