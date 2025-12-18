const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        subTotal: {
            type: Number,
            required: true
        }
    },
    { _id: false }
);


const addressSchema = new mongoose.Schema(
    {
        name: String,
        mobile: String,
        pincode: String,
        locality:String,
        city: String,
        state: String,
        address: String,
    },
    { _id: false }
);

const paymentSchema = new mongoose.Schema(
    {
        method: {
            type: String,
            enum: ["CARD", "UPI", "COD", "NET_BANKING"],
            default:"COD"
        },
        status: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
            default: "PENDING"
        },
        paidAmount: Number,
        currency: {
            type: String,
            default: "INR"
        }
    },
    { _id: false }
);

const OrderSchema = new mongoose.Schema({
    userId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[orderItemSchema],
    shippingAddress: addressSchema,
    payment : paymentSchema,

    grandTotal:{
        type: Number,
        required:true
    },

    orderStatus: {
        type: String,
        enum: [
            "PLACED",
            "CONFIRMED",
            "PROCESSING",
            "SHIPPED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED",
            "RETURN_REQUESTED",
            "RETURNED",
            "REFUNDED"
        ],
        default: "PLACED"
    },

    
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
