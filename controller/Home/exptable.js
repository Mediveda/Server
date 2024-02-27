const User = require("../../models/user");
const moment = require('moment');

exports.exptable = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch data from MongoDB using Mongoose
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure that 'stock' array exists in the user object
    const items = user.stock || [];


    const expiredItems = items
  .filter((item) => moment().isAfter(item.expiryDate))
  .map((item) => ({
    
    batchNumber: item.batchNumber,
    medecineName: item.medecineName,
    availablestock: item.availablestock,
    price: item.price,
    expiryDate:item.expiryDate
  }));

  //  console.log(expiredItems.length);

  const upcomingExpiredItems = items
  .filter((item) => moment(item.expiryDate).isBetween(moment(), moment().add(30, 'days'), null, '[]'))
  .map((item) => ({
    batchNumber: item.batchNumber,
    medecineName: item.medecineName,
    availablestock: item.availablestock,
    price: item.price,
    expiryDate: item.expiryDate
  }));
  // console.log(upcomingExpiredItems.length);
  
  const safeItems = items
  .filter((item) => moment(item.expiryDate).isAfter(moment().add(30, 'days')))
  .map((item) => ({
    batchNumber: item.batchNumber,
    medecineName: item.medecineName,
    availablestock: item.availablestock,
    price: item.price,
    expiryDate: item.expiryDate
  }));
  // console.log(safeItems.length);
  


  // Send the data as a JSON response
  res.status(200).json({
    success: true,
    expiredItems,
    upcomingExpiredItems,
    safeItems,
    message: "EXP TABLE SHOW",
  });
} catch (error) {
  console.error("Error fetching data from MongoDB:", error);
  res.status(500).json({ success: false, error: "Internal Server Error" });
}
  };


  //delete expire item
  exports.expmed = async (req, res) => {
    const userId = req.params.id;
    const { batchNumber, medecineName } = req.body; 
  
    try {
      // Fetch user from MongoDB using Mongoose
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Ensure that 'stock' array exists in the user object
      const items = user.stock || [];
  
      // Filter out expired items
      const nonExpiredItems = items.filter((item) =>  {
        return !(batchNumber.includes(item.batchNumber) && medecineName.includes(item.medecineName));
      });
  
      // Update the user's stock with non-expired items
      user.stock = nonExpiredItems;
  
      // Save the updated user to the database
      await user.save();
  
      res.status(200).json({ message: 'Expired medicine deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };