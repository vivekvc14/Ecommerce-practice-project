const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            qty: { type: Number, required: true }
        }
    ],
    shippingDetails: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String, default: false
    },
    paymentDetails: {
        orderId: String,
        payerId: String,
    },
    shippingPrice: { type: Number, default: 0.0, required: true },
    totalPrice: { type: Number, default: 0.0, required: true },
    paidAt: Date,
    isDelivered: {
        type: Boolean,
        default: false,
        required: true,
    },
    deliveredAt: Date,
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)