const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: { type: String, require: true },
    rating: { type: String, require: true },
    comment: { type: String, require: true },
    title: { type: String, require: true },
    user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
}, { timestamps: true })

const productSchema = new Schema({
    name: { type: String, require: true },
    image: { type: String, require: true },
    brand: { type: String, require: true },
    category: { type: String, require: true },
    description: { type: String, require: true },
    reviews: [reviewSchema],
    rating: { type: Number, require: true, default: 0 },
    numberOfReviews: { type: Number, require: true, default: 0 },
    stock: { type: Number, require: true, default: 0 },
    price: { type: Number, require: true },
    productIsNew: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)