
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


module.exports.signUp = async (req, res) => {
    try {
        let {email, password} = req.body;
        const user = await User.find({ email });
        if(user?.length > 0 ){
            return res.status(404).json({
                message:"Email Already Used"
            })
        }
        password = await bcrypt.hash(String(password),10);
        const newUser = (await User.create({ email , password})).toObject();
        const token =  jwt.sign({ id : newUser._id, email: newUser.email }, process.env.JWT_SECRET_KEY , { expiresIn :"24d"});
        res.status(200).json({
            message:"Sign up successfully.",
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
};

module.exports.logIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                message:"Email address is not found"
            })
        }
        const isCorrectPassword = await bcrypt.compare(String(password), user.password);
        if(!isCorrectPassword){
            return res.status(203).json({
                message:"Password is incorrect"
            });
        }
        const token = await jwt.sign({id : user._id, email: user._id }, process.env.JWT_SECRET_KEY,{ expiresIn : "24d"});
        res.status(200).json({
            message:"User logged successfully.",
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message:"user retrieved successfully.",
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}