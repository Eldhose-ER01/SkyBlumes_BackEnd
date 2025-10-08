const jwt=require('jsonwebtoken')
const User=require("../models/User")
const Booking=require("../models/Booking")
const{bookingCompleted}=require('../otp/Completedmail')
const Destinations=require("../models/Destination")
const State=require("../models/State")
const path = require('path');
/*----------------AdminLogin-------------------*/
exports.adminLogin=async(req,res)=>{
    try {
        const{email,password}=req.body.data.datas
        const Adminpassword=process.env.password
        const Adminemail=process.env.email
        const KEY = process.env.JWT_SECRET_KEY;
        if(email==Adminemail&&password==Adminpassword){
          const token=jwt.sign({email:Adminemail,role:"admin"},KEY,{expiresIn:"30d"})
            res.status(200).json({success:true,message:"Login Success",admindetails:token})
        }else{
            res.status(201).json({success:false,passwordnotmatch:"password or email incorrect"})
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}
/*-----------------Admin Can View all users-----------*/
exports.findUser=async(req,res)=>{
    try {
        const limit=5
        const totalItems=await User.countDocuments()
        const totalpages=Math.ceil(totalItems/limit)
        const page=parseInt(req.query.page)||1
        const skip=(page-1)*limit
        const searchItem=req.query.search
        let query={}
       
        if(searchItem){
            query.fname={$regex:new RegExp(searchItem,'i')}
        }
        const users=await User.find(query).skip(skip).limit(limit)
        res.status(200).json({success:true,users,totalpages,page})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }
}
/*-----------------user Block Or UnBlock-----------*/
exports.blockORUnblock=async(req,res)=>{
    try {
        const id=req.query.id
        let findUser=await User.findById({_id:id})
    
        findUser.status=!findUser.status
        await User.findOneAndUpdate({_id:id}, 
            {$set:{status:findUser.status}}
        );
        const userdata=await User.find()
        return res.send({success:true,userdata})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}
/*-----------------Add state and districts-----------*/
exports.addStateAndDistrict = async (req, res) => {
  try {
   
    const { statename, districtname, districtdesc, image } = req.body.data;

    const stateAnddistrictdatas = new State({
      statename,
      districtname,
      districtdesc,
      image,
    });

    await stateAnddistrictdatas.save();
    console.log(stateAnddistrictdatas,"stateAnddistrictdatasstateAnddistrictdatas");
    

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

exports.findstateAndDistrict=async(req,res)=>{
    try {
        const limit=5
        const totalItems=await State.countDocuments()
        const totalpages=Math.ceil(totalItems/limit)
        const page=parseInt(req.query.page)||1
        const skip=(page-1)*limit
        const searchItem=req.query.search
        let query={}
       
        if(searchItem){
            query.districtname={$regex:new RegExp(searchItem,'i')}
        }
        const statedata=await State.find(query).skip(skip).limit(limit)
        
        res.status(200).json({success:true,statedata,totalpages,page})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}
exports.StateBlockOrunBlock=async(req,res)=>{
    try {
        const stateId=req.query.id
        const findstate=await State.findById({_id:stateId})
        findstate.status=!findstate.status
        await State.findOneAndUpdate({_id:stateId}, 
            {$set:{status:findstate.status}}
        );
        const Statesdata=await State.find()
        res.status(200).json({success:true,Statesdata})

    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}
exports.StateAndDistrictDelete=async(req,res)=>{
    try {
        const Id=req.query.id
        await State.deleteOne({_id:Id})
        const Statedata=await State.find()
        res.send({success:true,Statedata})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}
exports.editStateAndDistrict = async (req, res) => {
  try {
    const { _id, statename, districtname, districtdesc, image } = req.body.data;

    if (!_id) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    await State.findByIdAndUpdate(
      _id,
      {
        statename,
        districtname,
        districtdesc,
        image, // store full URL
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.adddestinations = async (req, res) => {
    try {
       
        const {
            destination,
            duration,
            description,
            includes,
            notIncludes,
            ticketPrice,
            district,
            districtId,
            images // this will come from frontend (Cloudinary URLs)
        } = req.body.data;

        const newDestination = new Destinations({
            destination,
            duration,
            description,
            include: includes,
            notIncludes,
            ticketPrice,
            state: districtId,
            districtname: district,
            selectedImages: images // Cloudinary URLs
        });

        await newDestination.save();
        res.status(200).json({ success: true, message: "Destination submitted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.Finddestinations=async(req,res)=>{
    try {
         const limit=5
         const totalItems=await Destinations.countDocuments()
         const totalpages=Math.ceil(totalItems/limit)
         const page=parseInt(req.query.page)||1
         const skip=(page-1)*limit
         const searchItem=req.query.search
         let query={}
         if(searchItem){
            query.destination={$regex:new RegExp(searchItem,'i')}
         }
        const finddestinations=await Destinations.find(query).skip(skip).limit(limit)
        res.status(200).json({success:true,finddestinations,totalpages,page})
        
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }
}

exports.finddistrict=async(req,res)=>{
    try {
        const finddistrict = await State.find();
       
    
        
      
        res.status(200).json({success:true,finddistrict})
        
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})

    }
}

// In controllers/admin.js
exports.editdestination = async (req, res) => {
    try {
        // Log entire request data (for debugging)
        console.log("Request Data:", req.body.data);

        // ✅ Destructure _id (not id)
        const {
            _id,
            destination,
            state,
            duration,
            description,
            include,
            notIncludes,
            districtname,
            ticketPrice,
            selectedImages
        } = req.body.data;

        // ✅ Debug log
        console.log("_id from frontend:", _id);

        // ✅ Validate that _id exists
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Missing destination ID (_id)"
            });
        }

        // ✅ Update destination
        const updatedDestination = await Destinations.findByIdAndUpdate(
            _id,
            {
                destination,
                state,
                duration,
                description,
                include,
                notIncludes,
                districtname,
                ticketPrice,
                selectedImages
            },
            { new: true } // return updated document
        );

        // ✅ Handle not found
        if (!updatedDestination) {
            console.log("No destination found for ID:", _id);
            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });
        }

        // ✅ Success response
        console.log("Updated Destination:", updatedDestination);
        res.status(200).json({
            success: true,
            message: "Destination updated successfully",
            destination: updatedDestination
        });

    } catch (error) {
        // ✅ Error handling
        console.error("Error updating destination:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update destination",
            error: error.message
        });
    }
};
  exports.DestinationDelete = async (req, res) => {
    try {
      const id  = req.query.id;
 
        // Extract id from the request body
      await Destinations.deleteOne({_id:id });  // Ensure you're using _id field for deletion
   
    
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete destination',
        error: error.message
      });
    }
  };

  exports. BookingComplete=async(req,res)=>{
    try {
      const id=req.query.id
      console.log(id,"id");
      
      const cancelled= await Booking.findOneAndUpdate(
        { 
          _id: id,
          status: "booked" // Only cancel if status is "Booked"
        },
        { 
          $set: { status: "Completed" } 
        },
        { 
          new: true // Return the updated document
        }
      ).populate("user")
      bookingCompleted(cancelled.user.email)
      
      
        
      res.status(200).json({success:true})
    } catch (error) {
        res.status(500).json({ 
            success: false, 
          
            error: error.message 
          });
    }
  }

  exports.FindBookingsdata=async(req,res)=>{
    try {
        const unique=await User.find()
        const destination=await Destinations.find()
        const findbooking=await Booking.find().populate(['user', 'state', 'destination']);
        const total = findbooking.reduce((acc, booking) => acc + booking.totalAmount, 0);
        res.status(200).json({success:true,bookingdata:findbooking,unique,total,destination})
    } catch (error) {
        res.status(500).json({ 
            success: false, 
           
            error: error.message 
          });
    }
  }
  