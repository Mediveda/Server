const User = require("../../models/user");

exports.additem = async (req, res) => {
  try {
    const {
      userId,
      batchNumber,
      medecineName,
      category,
      expiryDate,
      maxRetailPrice,
      discount,
      availablestock,
      price,
      rackNumber,
      description,
      openStock,
      reorderLevel,
    } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Initialize the additem array if it's not defined
    user.additem = user.additem || [];

    // Search for the medicine by batch number
    const existingMedicineIndex = user.stock.findIndex(
      (item) => item.batchNumber === batchNumber && item.category === category
    );

    if (existingMedicineIndex !== -1) {
      // If medicine already exists, update the available stock
      user.stock[existingMedicineIndex].availablestock += availablestock;
      await user.save();
      return res.status(200).json({ message: "Medicine updated" });
    } else {
      // Create a new Additem instance and push it to the array
      user.stock.push({
        batchNumber,
        medecineName,
        category,
        expiryDate,
        maxRetailPrice,
        discount,
        availablestock,
        price,
        rackNumber,
        description,
        openStock,
        reorderLevel,
      });

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Medicine added successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error adding medicine, please try again after some time",
    });
  }
};

exports.stocktable = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch data from MongoDB using Mongoose
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure that 'stock' array exists in the user object
    const items = user.stock || [];

    const selectedItems = items.map((item) => ({
     
      batchNumber: item.batchNumber,
      medecineName: item.medecineName,
      category: item.category,
      description: item.description,
      availablestock: item.availablestock, // You need to calculate or fetch available stock based on your business logic
      // Add more fields as needed
    }));

    // Send the data as a JSON response
    res.status(200).json({
      success: true,
      selectedItems,
      message: "TABLE SHOW",
    });
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
