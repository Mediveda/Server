const User = require("../../models/user");
const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads"); // Uploads will be stored in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage: storage }).single("image");

exports.addBill = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "Error uploading image" });
      }

      const { userId, vendorName, challanNumber, orderDate, dueDate, remark } =
        req.body;


      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.bill = user.bill || [];

      user.bill.push({
        vendorName,
        challanNumber,
        orderDate,
        dueDate,
        remark,
        image: req.file.filename, // Save the filename in the bill object
      });

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Bill added successfully",
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error adding bill, please try again after some time",
    });
  }
};
