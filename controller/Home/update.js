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

      const { firstName, lastName, email, password, medicalName, licenseNumber, countryName, stateName, cityName, postalCode } = req.body;

      const {id} = req.params;

      if(!id){
        return res.status(404).json({error:"User not found"})
      }

      // Update user's personal information
      const updatedUserInfo = {
        firstName,
        lastName,
        email,
        password,
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

      res.json({ message: "Profile updated successfully", updatedProfile: updatedUserInfo });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
