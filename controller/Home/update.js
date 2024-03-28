const User = require("../../models/user");

exports.personalInfoUpdate = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password,
    medicalName,
    licenceNumber,
    countryName,
    stateName,
    cityName,
    postalCode,
  } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        password,
        medicalName,
        licenceNumber,
        countryName,
        stateName,
        cityName,
        postalCode,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
