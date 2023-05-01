const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    const { user, shippingDetails, orderItems, paymentMethod, shippingPrice, totalPrice, paymentDetails } = req.body;
    try {
        if (!orderItems) {
            return res.status(400).json("No itmes found!")
        }
        const order = new Order({
            user, shippingDetails, orderItems, paymentMethod, shippingPrice, totalPrice, paymentDetails
        })

        const newOrder = await order.save()

        return res.status(201).json((((await newOrder.populate(["user", "orderItems.product"])))))

    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
}