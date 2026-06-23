const Course = require('../models/Course');
const Section = require('../models/Section');
const mongoose = require('mongoose');
// create section
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        if(!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Section name needed',
            });
        }

        const section = await Section.create({
            sectionName
        });

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: section._id,
                }
            },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSections"
            },
        })
        .exec() 

        return res.status(200).json({
            success: true,
            message: 'Section created successfully!',
            updatedCourse,
        });
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Error While Ceating Section!'
        });
    }
}


// update section 
exports.updateSection = async (req, res) => {
    try {
        // fetching data 
        const { sectionName, sectionId, courseId } = req.body;

        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!',
            });
        }

        await Section.findByIdAndUpdate(
            sectionId, 
            {
                $set: { sectionName }
            },
            { new: true }
        );

        const course = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
                path: "subSections",
            }
        })
        .exec()

        return res.status(200).json({
            success: true,
            message: 'Section updated successfully!',
            date: course
        });
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Error While Updating Section!'
        });
    }
}   

// delete section
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    })
    const section = await Section.findById(sectionId)
    console.log(sectionId, courseId)
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      })
    }
    // Delete the associated subsections
    await SubSection.deleteMany({ _id: { $in: section.subSections } })

    await Section.findByIdAndDelete(sectionId)

    // find the updated course and return it
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec()

    res.status(200).json({
      success: true,
      message: "Section deleted",
      data: course,
    })
  } catch (error) {
    console.error("Error deleting section:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
