const Address = require("../models/address");

module.exports.createDeliveryAddress = async (req, res)=> {
    try {
        const {id} = req.query;
        const data = req.body;
        await Address.create({ userId : id , ...data  });
        res.status(200).json({
            message:"new address created successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
};

module.exports.getDeliveryAddress = async (req, res) => {
    try {
        const {id} = req.query;
        const deliveryAddress = await Address.find({
            userId: id
        });
        res.status(200).json({
            message:"Delivery address retreived successfully.",
            data: deliveryAddress
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}