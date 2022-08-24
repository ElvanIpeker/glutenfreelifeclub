const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET

})
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "images",
    },


});

const uploadMiddleware = multer({
    storage,
});

module.exports = uploadMiddleware;