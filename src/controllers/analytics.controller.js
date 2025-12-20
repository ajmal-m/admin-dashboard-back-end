
const Order = require("../models/order");
const User = require("../models/user");

module.exports.deliveredOrdersCount = async( req, res) => {
    try {
        const deliveredOrdersCount = await Order.countDocuments({ orderStatus :"DELIVERED" });
        res.status(200).json({
            data: deliveredOrdersCount,
            message:"Data reterived successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
};

module.exports.salesAtLastWeek = async (req, res) => {
     try {

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate()-7);
        const totalSales = await Order.aggregate([
            {
                $match:{
                    orderStatus:"DELIVERED",
                    createdAt: {
                        $gte: sevenDaysAgo,
                        $lte : today
                    }
                }
            },
            {
                $group:{
                    _id:null,
                    totalSales : { 
                        $sum:"$grandTotal"
                    }
                }
            }
        ]);
       res.status(200).json({
        data: totalSales[0]?.totalSales,
        message:"Data reterived successfully."
       });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
};

module.exports.totalUserCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.status(200).json({
            data: userCount,
            message:"data reterived successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server error"
        });
    }
};

module.exports.averageOrderValue = async (req, res) => {
    try {
        const avgOrderVal = await Order.aggregate([
            {
                $match:{
                    orderStatus:"DELIVERED"
                }
            },
            {
                $group:{
                    _id:null,
                    averageOrderValue : {
                        $avg:"$grandTotal"
                    }
                }
            }
        ]);
        res.status(200).json(
            {
                data: avgOrderVal[0]?.averageOrderValue || 0,
                message:"data reterived successfully."
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}