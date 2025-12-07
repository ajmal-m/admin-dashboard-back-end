
const Product = require("../models/product");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");


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

module.exports.getProductsById = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({ message: "Product Id missing"})
        }
        const product = await Product.findById(id).populate("category");
        res.status(200).json({
            message:"Product retreived successfully.",
            data: product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}


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

module.exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.query;
        const { name, category , stock, price  , active , public_id } = req.body;
        const image = req.file;

        let updateData = {};
        if(image && public_id){
            let  updatedImage = await cloudinary.uploader.upload(image.path, {
                public_id,
                overwrite: true
            })
            updateData["image"] = {
                secure_url: updatedImage.secure_url,
                public_id : updatedImage.public_id
            }
        }
        if(name && name.trim()){
            updateData["name"] = name;
        }
        if(category){
            updateData["category"] = category;
        }
        if(stock){
            updateData["stock"] = stock;
        }
         if(price){
            updateData["price"] = price;
        }
        if(active){
            updateData["active"] = Number(active) ? true : false;
        }

        await Product.findByIdAndUpdate(
            id,
            updateData
        );
        res.status(200).json({
            message:"Product updated successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}

module.exports.getSimilarProducts = async (req, res) => {
   try {
        const {pId, cId} = req.params;
        if(!pId || !cId){
            return res.status(404).json({
                message:"Product Id or Category Id is Missing."
            })
        }
        const products = await Product.find({ _id : { $ne :  new mongoose.Types.ObjectId(pId) } , category: cId }).populate("category").limit(20);
        res.status(200).json({
            data:products,
            message:"products retrieved successfully."
        })
   } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
   }
}

module.exports.getProductsByCategoryId = async (req, res) => {
    try {
        const {cId} = req.params;
        if(!cId){
            return res.status(404).json({
                message:"category Id is Missing"
            });
        }
        const products = await Product.find({ category : cId }).select("-category");
        res.status(200).json({
            data:products,
            message:"products retrieved successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}