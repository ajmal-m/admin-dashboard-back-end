const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category :{
        type: new mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type: Object,
        required: true
    },
    active:{
        type:Boolean,
        required: false,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
