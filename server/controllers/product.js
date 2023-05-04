const Product = require("../models/Product")
const User = require("../models/User")

exports.getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.productId)
    if (product) {
        res.json(product)
    } else {
        return res.status(404).json("Product not found")
    }
}

exports.createReview = async (req, res) => {
    const { userId, rating, title, comment } = req.body;
    try {
        const product = await Product.findById(req.params.productId)
        const user = await User.findById(userId)
        if (req.user._id.toString() === user._id.toString()) {
            if (product) {
                const alreadyReviewed = product.reviews.find(review => review.user.toString() === user._id.toString())
                if (alreadyReviewed) {
                    return res.status(400).json("Product already reviewed")
                }

                const review = {
                    name: user.name,
                    rating,
                    comment,
                    title,
                    user: user._id
                }

                product.reviews.push(review)
                product.numberOfReviews = product.reviews.length;
                product.rating = product.reviews.reduce((total, review) => total += review.rating, 0) / product.reviews.length;

                await product.save()
                res.status(201).json({ message: "Review has been saved!" })
            } else {
                return res.status(404).json("Product not found!")
            }
        } else {
            return res.status(402).json("You are not authorized.")
        }
    } catch (error) {
        res.status(500).json("Something went wrong, please try again.")
    }
}