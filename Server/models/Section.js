const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
    },
    subSections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubSection'
        }
    ]
});

module.exports = mongoose.model("Section", sectionSchema);

exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const allowedFields = ["title", "price", "description"];
    const updates = {};

    for (let key in req.body) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updates,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedCourse,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating course",
    });
  }
};