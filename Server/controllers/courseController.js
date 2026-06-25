const Course = require('../models/Course');
const Category = require('../models/Category');
const CourseProgress = require('../models/CourseProgress')
const Section = require('../models/Section');
const User = require('../models/User');
const SubSection = require('../models/Course');
const {uploadFileToCloudinary} = require('../utils/cloudinaryUpload');
const { convertSecondsToDuration } = require('../utils/secToDuration')

// todo we add status like draft and published to model so modify controller which works on this field like if we fetch all courses it must show courses which are published not drafted one
// todo write getFullCourseDetails, getInstructorCouses, deleteCourse
// getCourseDetails -> preview before buying getFullCourseDetails -> actual content
exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag: _tag, category, status, instructions: _instructions } = req.body;
        const thumbnail = req.files.thumbnailImage;
        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !_tag || !_instructions) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!',
            })
        }

        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        if (
            !Array.isArray(tag) ||
            !Array.isArray(instructions) ||
            tag.length === 0 ||
            instructions.length === 0
            ) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!',
            })
        }
        if(!status || status === undefined) {
            status = "Draft"
        }
        console.log("category from input: ", category);

        const categoryDetails = await Category.findById(category);
        console.log("category: ", categoryDetails);
        if(!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid Category"
            })
        }
        // Todo check type before uploading thumbnail can be img like png jpg jpeg etc but not can be video or gif
        const instructorId = req.user.id;
        // check that is it instructor
        const instructorDetails = await User.findById(instructorId, {accountType: "Instructor"});

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            })
        }
        const uploadResult = await uploadFileToCloudinary(thumbnail, 'StudyNotion');
        console.log("upload result : ", uploadResult);
        const thumbnailUrl = uploadResult?.secure_url;
        console.log("thumbnail url: ", thumbnailUrl)

        const course = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorId,
            whatYouWillLearn,
            courseContent:[],
            ratingAndReviews:[],
            price,
            tag,
            thumbnail:thumbnailUrl,
            studentsEnrolled:[],
            category,
            status,
            instructions
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
            data: course
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
                studentsEnrolled: true,
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

        if(course.status === "Draft") {
          return res.status(403).json({
            success: false,
            message: 'Accessing a draft course is not allowed'
          })
        }

        let totalDurationInSeconds = 0
        course.courseContent.forEach((section) => {
          section.subSections.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })

      const totalDuration = totalDurationInSeconds
        // todo update this controller by seeing final code
        return res.status(200).json({
            success: true,
            message: 'Course Details Fetched Successfully!',
            data: {
              courseDetails: course,
              totalDuration
            }
        })
    }catch(err) {
        console.log('Get course details error: ',err);
        
        return res.status(500).json({
            success: false,
            message: 'Error while getting course details'
        })
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    console.log("courseSections: ", courseSections);
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      console.log("sectionId: ", sectionId);
      console.log("section: ", section);
      if (section) {
        const subSections = section.subSections
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Remove the course id from category
    await Category.findByIdAndUpdate(course.category, {
      $pull: { courses: courseId }
    })

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSections.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadFileToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // syncing the categories courses
    const categoryChanged =updates.category && updates.category.toString() !== course.category.toString();

    if (categoryChanged) {
      await Category.findByIdAndUpdate(course.category, {
        $pull: { courses: courseId },
      });

      await Category.findByIdAndUpdate(updates.category, {
        $addToSet: { courses: courseId },
      });
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (Object.hasOwn(updates,key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}