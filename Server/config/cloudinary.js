const cloudinary = require('cloudinary');

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log('Cloudinary config done!');
    }catch(err) {
        console.log(`Error while connecting to cloudinary: ${err}`);
        process.exit(1);
    }
}

module.exports = {cloudinary, cloudinaryConnect};