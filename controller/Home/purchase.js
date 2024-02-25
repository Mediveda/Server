const User = require("../../models/user");

exports.addBill = async (req, res) => {
  try {
    const { userId, vendorName, challanNumber, orderDate, dueDate, remark } =
      req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not " });
    }

    // Initialize the additem array if it's not defineds
    user.bill = user.bill || [];

    user.bill.push({
      vendorName,
      challanNumber,
      orderDate,
      dueDate,
      remark,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Bill added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error adding bill, please try again after some time",
    });
  }
};
