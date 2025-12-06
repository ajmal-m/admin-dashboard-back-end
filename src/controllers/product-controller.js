
const Product = require("../models/product");
const cloudinary = require("../config/cloudinary");


module.exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            message:"Product retrieved successfully.",
            data: products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}


module.exports.addProducts = async (req, res) => {
    try {
        const image = req.file;
        const { name, category , stock, price  , active} = req.body;
        const uploadedImage = await cloudinary.uploader.upload(image.path);
        await Product.create({
            name,
            category,
            stock,
            price,
            active : Number(active) ? true : false ,
            image:{
                secure_url: uploadedImage.secure_url,
                public_id: uploadedImage.public_id
            }
        });
        res.status(200).json({
            message:"Product created successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
};