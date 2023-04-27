const Product = require("../models/Product")

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