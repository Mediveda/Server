const bcrypt = require('bcrypt');
const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const { options } = require('../../routes/user');
require('dotenv').config();

//signup handler
exports.signup = async (req, res) => {
    try {
        //get data
        const { firstName, lastName, email, password, medicalName, licenceNumber, countryName, stateName, cityName, postalCode } = req.body;
        //if already axist
        const existingUser = await User.findOne({  email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already hsave Account",
            });
        }
        //password secure
      
        try {
            hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword)
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in password hashed"
            });
        }
        //create entry for new user
        const data = await User.create({firstName,lastName,email,password:hashedPassword,  medicalName, licenceNumber, countryName, stateName, cityName, postalCode})
        return res.status(200).json({
            success: true,
            message: "User Created Successfully"
        });
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be registererd please try again after some time"
        });
    }
}



//Login controller

exports.login = async (req, res) => {
    try {
        //fetch data
        const { email, password } = req.body;
      
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All Information..."
            });
        }
        //check for registered user
        let user = await User.findOne({ email });
        //if not a regstered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not Registered..',
            });
        }

        const payload = {
            email: user.email,
            id: user._id,

        };

        //verify password & generate aut token
        if (await bcrypt.compare(password, user.password)) {
            //pass match
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                });
                const items = [user]|| [];

                const personalinfo = items.map((item) => ({
                    _id:item.id,
                    firstName: item.firstName,
                    lastName:item.lastName,
                    medicalName: item.medicalName,
                    email: item.email,
                    licenceNumber: item.licenceNumber,
                    
                    // You need to calculate or fetch available stock based on your business logic
                    // Add more fields as needed
                  }));

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                personalinfo,
                message: "User Logged In Successfully...",
            });
        
        }
        else {
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect.."
            });
        }
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be registererd please try again after some time"
        });
    }
}


