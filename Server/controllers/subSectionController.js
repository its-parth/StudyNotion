const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { uploadFileToCloudinary } = require('../utils/cloudinaryUpload');
const mongoose = require('mongoose');

exports.createSubSection = async (req, res) => {
    try {
        const { title, description, sectionId } = req.body;
        const videoFile = req.files?.videoFile;

        if(!title || !description || !videoFile || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!',
            });
        }

        if(!mongoose.Types.ObjectId.isValid(sectionId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid section id'
            })
        }

        const section = await Section.findById(sectionId);
        if(!section) {
            return res.status(400).json({
                success: false,
                message: 'Section not found',
            })
        }
       
        const uploadResult = await uploadFileToCloudinary(videoFile, `StudyNotion/Sections/${sectionId}`);

        if(!uploadResult) {
            return res.status(500).json({
                success: false,
                message: 'Error in creating sub section',
            });
        }

        // create sub section
        const subSection = await SubSection.create({
            title, 
            timeDuration: uploadResult?.duration,
            description,
            videoUrl: uploadResult?.secure_url,
        });

        // add subsection in section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $push: {
                subSections: subSection._id
            }
        },
        {new: true}
        ).populate('subSections');

        return res.status(200).json({
            success: true,
            message: 'Sub section created successfully!',
            section: updatedSection,
        })
    }catch(err) {
        console.log('Error in creating sub section: ',err);
        
        return res.status(500).json({
            success: false,
            message: 'Error while creating sub section'
        });
    }
}

exports.updateSubSection = async (req, res) => {
    try {   
        // todo if user upload new video delete prev video before uploading new one 
        const { title, description, subSectionId } = req.body;
        const videoFile = req.files?.videoFile;
        if(!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Sub Section id is required",
            });
        }

        if(!mongoose.Types.ObjectId.isValid(subSectionId)) {
            return res.status(400).json({
                success: false,
                message: 'Sub section id is invalid'
            })
        }

        const subSection = await SubSection.findById(subSectionId);
        if(!subSection) {
            return res.status(404).json({
                success: false,
                message: 'Sub Section not found',
            })
        }

        const updatedData = {};
        if(title) updatedData.title = title;
        if(description) updatedData.description = description;

        const section = await Section.findOne({
            subSections: subSection._id,
        });
        if(!section) {
            return res.status(404).json({
                success: false,
                message: 'Subsections Section Not found!',
            })
        }

        if(videoFile) {
            const uploadResult = await uploadFileToCloudinary(videoFile, `StudyNotion/Sections/${section._id}`);
            if(!uploadResult) {
                return res.status(500).json({
                    success: false,
                    message: "Error in uploading video file"
                });
            }
            updatedData.videoUrl = uploadResult?.secure_url;
            updatedData.timeDuration = uploadResult?.duration;
        }

        await SubSection.findByIdAndUpdate(subSectionId, updatedData);

        const updatedSection = await Section.findOne(
            {subSections: subSectionId}
        ).populate('subSections');

        return res.status(200).json({
            success: true,
            message: 'Sub section updated successfully!',
            section: updatedSection
        });

    }catch(err) {
        console.log('Error in updating sub section: ',err);
        
        return res.status(500).json({
            success: false,
            message: 'Error while updating sub section'
        });
    }
}

exports.deleteSubSection = async (req, res) => {
    try {

        // todo delete cloudinary video and also learn about transactions and centralized error handling
        const { subSectionId, sectionId } = req.body;
        if(!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!',
            })
        }
        if(!mongoose.Types.ObjectId.isValid(subSectionId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid SubSection Id'
            });
        }
        if(!mongoose.Types.ObjectId.isValid(sectionId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Section Id'
            });
        }
        
        const subSection = await SubSection.findByIdAndDelete(subSectionId);
        if(!subSection) {
            return res.status(404).json({
                success: false,
                message: 'Sub Section not found!',
            });
        }

        // remove sub section from section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $pull: {
                subSections: subSectionId
            }
        },
            {new: true}
        );

        if(!updatedSection) {
            return res.status(404).json({
                success: false,
                message: 'Section not found!',
            })
        }


        return res.status(200).json({
            success: true,
            message: 'Sub section deleted successfully',
            section: updatedSection
        })
    }catch(err) {
        console.log('Error in deleting sub section: ',err);
        
        return res.status(500).json({
            success: false,
            message: 'Error while deleting sub section'
        });
    }
}