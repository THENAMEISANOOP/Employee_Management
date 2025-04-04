const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png', // Ensure format is correct
    public_id: (req, file) => file.originalname.split('.')[0], // Generate public_id
  },
});

// Multer File Upload Middleware
const cloudinaryFileUploader = multer({ storage });

module.exports = {
  cloudinaryFileUploader,
};
