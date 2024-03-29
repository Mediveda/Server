const express = require("express");
const router = express.Router();
const multer = require("multer"); // For handling file uploads
const User = require("../../models/user");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Renaming file with current timestamp
  },
});
const upload = multer({ storage: storage }).single("image");

// Update user personal info including profile picture
exports.profileUpdate = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Error uploading image" });
      }
      const userId = req.params.userId;
      const { firstName, lastName, email, password, medicalName, postalCode, licenseNumber } = req.body;

      // Update user's personal information
      const updatedUserInfo = {
        firstName,
        lastName,
        email,
        password,
        medicalName,
        postalCode,
        licenseNumber,
        profilePic: req.file ? req.file.filename : undefined,
      };

       const updatedUser = await User.findByIdAndUpdate(userId, updatedUserInfo, { new: true });
     

      res.json({ message: "Profile updated successfully", updatedProfile: updatedUser});
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};