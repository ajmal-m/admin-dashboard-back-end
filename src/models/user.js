const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    password:{
        type:String,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
