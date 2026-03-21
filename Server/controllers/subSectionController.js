const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { uploadFileToCloudinary } = require('../utils/cloudinaryUpload');
const mongoose = require('mongoose');

const createSubSection = async (req, res) => {
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
            return res.status(404).json({
                success: false,
                message: 'Section not found'
            })
        }

        const section = await Section.findById(sectionId);
        if(!section) {
            return res.status(400).json({
                success: false,
                message: 'Invalid section id',
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

const updateSubSection = async (req, res) => {
    try {

    }catch(err) {
        console.log('Error in creating sub section: ',err);
        
        return res.status(500).json({
            success: false,
            message: 'Error while creating sub section'
        });
    }
}

const deleteSubSection = async (req, res) => {
    try {

    }catch(err) {
        console.log('Error in creating sub section: ',err);
        
        return res.status(500).json({
            success: false,
            message: 'Error while creating sub section'
        });
    }
}