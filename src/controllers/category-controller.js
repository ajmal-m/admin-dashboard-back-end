

const cloudinary = require("../config/cloudinary");
const Category = require("../models/product-category");
const mongoose = require("mongoose");


module.exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message:"Category retrieved successfully.",
            data: categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.addCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const { secure_url, ...remainProps} = await cloudinary.uploader.upload(req.file.path,{
        })
        await Category.create({ name, image: secure_url });
        res.status(200).json({ message:"Image uploaded successfully"  })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.deleteCategory = async (req, res) => {
    try {
        const {id} = req.query;
        await Category.findByIdAndDelete({id});
        res.status(200).json({ message:"Category deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}