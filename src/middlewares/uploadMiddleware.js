const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const userStorage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'fastfoodstore/users',
    },
});

const productStorage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'fastfoodstore/products',
    },
});

const uploadUserCloud = multer({ storage: userStorage });
const uploadProductCloud = multer({ storage: productStorage });

module.exports = { uploadUserCloud, uploadProductCloud };
