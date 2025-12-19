const Order = require("../models/order");


module.exports.getOrdersByUserId = async (req, res) => {
    try {
        
        const orders = await Order.find({ userId : req.params.id });
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
        
        const orders = await Order.find();
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