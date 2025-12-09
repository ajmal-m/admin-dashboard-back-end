const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",     
  port: 587,
  secure: false,  
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

module.exports = transporter;