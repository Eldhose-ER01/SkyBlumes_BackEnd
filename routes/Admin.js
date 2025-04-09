// routes/Admin.js
const express = require('express');
const adminroutes = express.Router();
const admincontroller = require('../controllers/admin');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'travelhub',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});

const upload = multer({ storage: storage });

// Define routes
adminroutes.post('/login', admincontroller.adminLogin);
adminroutes.get('/userlist', admincontroller.findUser);
adminroutes.post('/blockorunblock', admincontroller.blockORUnblock);
adminroutes.post('/addstate-district', upload.single("file"), admincontroller.addStateAndDistrict);
adminroutes.get('/findstate', admincontroller.findstateAndDistrict);
adminroutes.post('/blockorunblockstates', admincontroller.StateBlockOrunBlock);
adminroutes.post('/deletestates', admincontroller.StateAndDistrictDelete);
adminroutes.post('/editstates', upload.single("file"), admincontroller.editStateAndDistrict);
adminroutes.post('/adddestinations', upload.array("selectedImages", 3), admincontroller.adddestinations);
adminroutes.get('/dstination', admincontroller.Finddestinations);
adminroutes.get('/finddistrict', admincontroller.finddistrict);
adminroutes.post('/deletedestination', admincontroller.DestinationDelete);
adminroutes.post('/editdestination', upload.array("selectedImages", 3), admincontroller.editdestination);
adminroutes.post('/bookingcomplete', admincontroller.BookingComplete);
adminroutes.get('/getbookingdatas', admincontroller.FindBookingsdata);

module.exports = adminroutes;
