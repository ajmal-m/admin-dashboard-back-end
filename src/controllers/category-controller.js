

const cloudinary = require("../config/cloudinary");
const Category = require("../models/product-category");


module.exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ updatedAt : -1  });
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
        let uploadedFile;
        let addData = {};
        if(req.file){
            uploadedFile = await cloudinary.uploader.upload(req.file.path)
        }
        if(name){
            addData['name'] = name;
        }
        if(uploadedFile){
            addData['image'] = { secure_url : uploadedFile.secure_url, public_id: uploadedFile.public_id };
        }
        await Category.create(addData);
        res.status(200).json({ message:"Category created successfully"  })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.deleteCategory = async (req, res) => {
    try {
        const {id} = req.query;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message:"Category deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        const {id , public_id} = req.query;
        const { name} = req.body;
        let updateImage;
        let updateQuery = {};
        console.log(public_id, id, req.file)
        if(req.file){
            updateImage = await cloudinary.uploader.upload(
                req.file.path,
                {
                    public_id,
                    overwrite:true
                }
            );
        };
        if(name){
            updateQuery['name'] = name;
        }
        if(updateImage){
            updateQuery['image'] = {
                public_id : updateImage.public_id,
                secure_url: updateImage.secure_url
            }
        }
        console.log("UPdatedQuery ", updateQuery , updateImage)
        await Category.findByIdAndUpdate(id, updateQuery);
        res.status(200).json({ message:"Image updated successfully."})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}