const Order = require("../models/order");
const { ADMIN_ORDER_SORT_OPTIONS } = require("../utils/const");


module.exports.getOrdersByUserId = async (req, res) => {
    try {
        
        const orders = await Order.find({ userId : req.params.id }).sort({ createdAt: -1 });
        res.status(200).json({
            data:orders,
            message:"Order fetched sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
};


module.exports.getAllOrders = async (req, res) => {
    try {
        const orderStatuses = req.query?.ods;
        const paymentStatuses = req.query?.pts;
        const limit = req.query?.limit ?? 10;
        const page = req.query?.page ?? 1;
        const sort = req.query?.sort ?? '';

        let findQuery = {};
        let sortQuery = {};

        if(orderStatuses?.length){
            findQuery = {
                ...findQuery,
                orderStatus:{
                    $in : orderStatuses
                }
            }
        };
        if(paymentStatuses?.length){
            findQuery = {
                ...findQuery,
                'payment.status':{
                    $in: paymentStatuses
                }
            }
        }
        if(sort){
            sortQuery = {
                ...sortQuery,
                ...ADMIN_ORDER_SORT_OPTIONS[JSON.parse(JSON.stringify(sort))]
            };
        }
        const queryClone = Order.find(findQuery).sort(sortQuery);
        const query = Order.find(findQuery).sort(sortQuery).skip((page-1) * limit ).limit(limit);

        const totalCount = await queryClone.countDocuments();
        const totalPages = Math.ceil(totalCount/limit);
        const orders = await query;

        res.status(200).json({
            data:orders,
            count: orders.length,
            totalPages: totalPages,
            currentPage: Number(page),
            message:"Order fetched sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}

module.exports.getOrderByOrderId = async (req, res)=> {
     try {
        const order = await Order.findById(req.params.id).populate("items.productId");
        const orderObj = order.toObject();

        orderObj.items = orderObj.items.map(item => {
            item.product = item.productId;
            delete item.productId;
            return item;
        });

        res.status(200).json({
            data:orderObj,
            message:"Order fetched sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}


module.exports.updateOrderStatus = async (req, res) =>{
    try {
        const updateQuery = {};
        const data = req.body;
        if(!data?.id){
            return res.status(404).json({ message:"Order Id is missing" })
        }
        if(data?.orderStatus){
            updateQuery["orderStatus"] = data.orderStatus;
        }
        if(data?.paymentStatus){
            updateQuery["payment.status"] = data.paymentStatus;
        }
        const updatedval =  await Order.findByIdAndUpdate(
            data.id,
            {
                $set: updateQuery
            }
        );
        res.status(200).json({
            data: updatedval,
            message:"Order status updated successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}


module.exports.createOrder = async(req, res) => {
    try {
        if(!req.body.order){
            return res.status(404).json({
                message:"Order is missing",
            });
        }
        const newOrder = await Order.create(req.body.order);
        res.status(200).json({
            data:newOrder,
            message:"Order create sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}


module.exports.deleteOrder = async (req, res) => {
    try {
        const id = req.params?.id;
        if(!id){
            return res.status(404).json({
                message:"Order Id missing"
            });
        }
        const delData = await Order.findByIdAndDelete(id);
        res.status(200).json({
            data: delData,
            message:"Order delete successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}