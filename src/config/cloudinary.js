const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");

dotenv.config();

const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const API_KEY = process.env.CLOUDINARY_API_KEY;

module.exports = cloudinary.config({ 
  cloud_name: 'fishMpm', 
  api_key: API_KEY, 
  api_secret: API_SECRET,
  secure_distribution: 'fishmpm.shop',
  upload_prefix: 'https://api-eu.cloudinary.com'
});