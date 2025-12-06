
const Product = require("../models/product");
const cloudinary = require("../config/cloudinary");


module.exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ }).populate("category");

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
};


module.exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(200).json({
            message:"Product deleted successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}



module.exports.deleteProduct = async (req, res) => {
    try {
        const {id} = req.query;
        // Delete cloudinary image
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({
                message:"Product is Not found"
            })
        }
        await cloudinary.uploader.destroy( product.image.public_id );
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            message:"Product Deleted Successfully."
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