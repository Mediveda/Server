
const User = require("../../models/user");

exports.medicalnfo = async (req, res) => {
    try {
        // Get medical data
        const { userId, medicalName, licenceNumber, countryName, stateName, cityName, postalCode } = req.body;

        // Find user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create or update medicalinfo for the user
        user.medicalinfo = {
            medicalName,
            licenceNumber,
            countryName,
            stateName,
            cityName,
            postalCode
        };

        // Save the updated user with medicalinfo
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Medical info saved successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Medical info cannot be registered, please try again after some time"
        });
    }
};
