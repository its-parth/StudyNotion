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
 
