const express = require('express');
const adminroutes = express.Router();
const admincontroller = require('../controllers/admin');

// State routes (Cloudinary)
adminroutes.post('/addstate-district', admincontroller.addStateAndDistrict);
adminroutes.post('/editstates', admincontroller.editStateAndDistrict);

// Destination routes (Cloudinary)
adminroutes.post('/adddestinations', admincontroller.adddestinations);
adminroutes.post('/editdestination', admincontroller.editdestination);

// Other routes
adminroutes.post('/login', admincontroller.adminLogin);
adminroutes.get('/userlist', admincontroller.findUser);
adminroutes.post('/blockorunblock', admincontroller.blockORUnblock);
adminroutes.get('/findstate', admincontroller.findstateAndDistrict);
adminroutes.post('/blockorunblockstates', admincontroller.StateBlockOrunBlock);
adminroutes.post('/deletestates', admincontroller.StateAndDistrictDelete);
adminroutes.get('/dstination', admincontroller.Finddestinations);
adminroutes.get('/finddistrict', admincontroller.finddistrict);
adminroutes.post('/deletedestination', admincontroller.DestinationDelete);
adminroutes.post('/bookingcomplete', admincontroller.BookingComplete);
adminroutes.get('/getbookingdatas', admincontroller.FindBookingsdata);

module.exports = adminroutes;
