const express = require("express");
const multer = require("multer"); // For handling file uploads
const User = require("../../models/user");
const path = require("path");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname,"../profilePic");
    require("fs").mkdirSync(uploadPath,{
      recursive:true });
    cb(null, uploadPath); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("profilePic");

// Update user personal info including profile picture
exports.profileUpdate = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Error uploading image" });
      }

      const { firstName, lastName, email, medicalName, licenseNumber, countryName, stateName, cityName, postalCode } = req.body;

      const {id} = req.params;

      if(!id){
        return res.status(404).json({error:"User not found"})
      }

      // Update user's personal information
      const updatedUserInfo = {
        firstName,
        lastName,
        email,
        medicalName,
        licenseNumber,
        countryName,
        cityName,
        stateName,
        postalCode,
        profilePic: req.file ? req.file.filename : undefined,
      };
      
    

      const updatedUser = await User.findByIdAndUpdate(id, updatedUserInfo, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({success:true,
        message: "Profile updated successfully", 
        updatedProfile: updatedUserInfo });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getProfile =  async (req, res) => {
    try {
      const userId = req.params.id;
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const items = [user]|| [];
      const personalinfo = items.map((item) => ({
        _id:item.id,
        firstName: item.firstName,
        lastName:item.lastName,
        medicalName: item.medicalName,
        email: item.email,
        licenceNumber: item.licenceNumber,
        countryName:item.countryName,
        stateName:item.stateName,
        cityName:item.cityName,
        postalCode:item.postalCode,
        profilepic:item.profilePic,

            }));
  
      // Return the bill data including the image filename
      return res.status(200).json({
        success: true,
        profile : personalinfo,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error fetching bill data, please try again after some time",
      });
    }
  };
  
  