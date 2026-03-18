const { cloudinary } = require('../config/cloudinary');

exports.uploadFileToCloudinary = async (file, folder, height, quality) => {
    const options = {
        folder, 
        resource_type: 'auto',
    };
    if(height) options.height = height;
    if(quality) options.quality = quality;

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
}