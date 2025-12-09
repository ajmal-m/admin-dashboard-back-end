
const nodemailer = require("../config/node-mailer");
const crypto = require("crypto");


const emailOTP = {
};


module.exports.sendOTP = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(404).json({
                message:"email is REquired"
            })
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        emailOTP[email] = {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        };
        const sendInfo = await nodemailer.sendMail({
            from: '"FishMpm"<ajmalm76774@gmail.com>',
            to: email.replace(/['"]/g, ""),
            subject: "Your OTP Code for Verification",
            html: `<h2>Email Verification</h2>
                <p>Your One-Time Password (OTP) is:</p>
                <h1 style="font-size: 32px; letter-spacing: 4px;">${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
                `, 
        })
        res.status(200).json({
            message:"Email sended successfully.",
            data: sendInfo.messageId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
};


module.exports.verifyOTP = async (req, res) => {
    try {
        const {otp , email} = req.body;
        if( ! emailOTP[email] || emailOTP[email]?.otp != otp ){
            return res.status(404).json({
                message:"OTP invalid."
            })
        }
        if( Date.now() > emailOTP[email]?.expiresAt ){
             return res.status(404).json({
                message:"OTP is expired."
            })
        }
        res.status(200).json({
            message:"OTP is verified."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}