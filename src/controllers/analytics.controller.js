
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
};


module.exports.orderStatusDatas = async (req, res) => {
    try {
        const orderStatusDatas = await Order.aggregate([
            {
                $group:{
                    _id: "$orderStatus",
                    count : { $sum : 1}
                }
            },
            {
                $project:{
                    _id:0,
                    label:"$_id",
                    value:"$count"
                }
            }
        ]);
        res.status(200).json({
            data : orderStatusDatas,
            message:"data reterived successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            message:"Internal server error"
        });
    }
};


module.exports.topProductsOfLastWeek = async (req, res) => {
    try {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate()-7);
        sevenDaysAgo.setHours(0,0,0,0);

        const data = await Order.aggregate([
            {
                $match:{
                    createdAt: { $gte : sevenDaysAgo , $lte : today }
                }
            },
            {
                $unwind:"$items"
            },
            {
                $group:{
                    _id:"$items.productId",
                    totalQuantity:{$sum : "$items.quantity" }
                }
            },
            {
                $lookup:{
                    from:"products",
                    localField:"_id",
                    foreignField:"_id",
                    as:"Product"
                }
            },
            {
                $unwind:"$Product"
            },
            {
                $sort:{
                    totalQuantity:-1
                }
            },
            {
                $project:{
                    _id:0,
                    value:"$totalQuantity",
                    name:"$Product.name"
                }
            },
            {
                $limit:10
            }
        ]);
        res.status(200).json({
            data,
            message:"data reterived successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}


module.exports.lastWeekEachDaySales = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(23,59,59 ,999)
        const sevenDayBack = new Date();
        sevenDayBack.setDate(today.getDate()-6);
        sevenDayBack.setHours(0,0,0,0);

        const data = await Order.aggregate([
            {
                $match:{
                    orderStatus:"DELIVERED",
                    updatedAt:{
                        $gte: sevenDayBack,
                        $lte : today
                    }
                }
            },
            {
                $project:{
                    shippingAddress:0,
                    payment:0,
                }
            },
            {
                $group:{
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$updatedAt"
                        }
                    },
                    totalSale:{ $sum : "$grandTotal"}
                }
            },
            {
                $project:{
                    _id:0,
                    date:"$_id",
                    sales:"$totalSale"
                }
            },
            {
                $sort:{ date : 1 }
            }
            
        ]);
        const resultMap = {};
        data.forEach((item) => {
            resultMap[item.date] = item.sales;
        });
        const finalResultMap = [];
        for(let i=0; i< 8; i++){
            const d = new Date(sevenDayBack);
            d.setDate( sevenDayBack.getDate() + i);
            const key = d.toISOString().slice(0,10);
            finalResultMap.push({
                date: key,
                sales: resultMap[key] || 0
            })
        }
        res.status(200).json({
            message:"Data reterived successfully.",
            data : finalResultMap, 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
}