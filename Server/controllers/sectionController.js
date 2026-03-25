const Course = require('../models/Course');
const Section = require('../models/Section');
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

        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: section._id,
                }
            }
        )

        return res.status(200).json({
            success: true,
            message: 'Section created successfully!',
            section,
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
        const { sectionName, sectionId } = req.body;

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
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Section updated successfully!',
        });
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Error While Updating Section!'
        });
    }
}   

// delete section
exports.deleteSection = async (req,res) => {
    try {
        const { sectionId } = req.params;

        if(!sectionId) {
            return res.status(400).json({
                success: false,
                message: 'Section Id Required To Delete Section!',
            });
        }

        if(!mongoose.Types.ObjectId.isValid(sectionId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid section id format!',
            });
        }

        if(!section) {
            return res.status(404).json({
                success: false,
                message: 'Section not exist'
            });
        }

        // Todo practice queries like below
        const course = await Course.findOne({ courseContent: { $in: [sectionId] } });

        if(!course) {
            return res.status(400).json({
                success: false,
                message: 'Invalid section id'
            })
        }

        // await Course.findByIdAndUpdate(course._id, {
        //     $pull: {
        //         courseContent: sectionId,
        //     }
        // });
 
        await Course.updateMany(
            { courseContent: sectionId },
            {
                $pull: {
                    courseContent: sectionId,
                }
            }
        );

        const section = await Section.findById(sectionId);

        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully!',
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Error While Deleting Section!'
        });
    }
}