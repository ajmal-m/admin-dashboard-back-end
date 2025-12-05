const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");

dotenv.config();

const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET,
  secure_distribution: 'fishmpm.shop',
  upload_prefix: 'https://api-eu.cloudinary.com'
});

module.exports = cloudinary;