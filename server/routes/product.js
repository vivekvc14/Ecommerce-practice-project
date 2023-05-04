const express = require("express")
const routes = express.Router()

const productControllers = require('../controllers/product')
const verifyToken = require("../tokens/verifyToken")

routes.get("/", productControllers.getProducts)

routes.get("/:productId", productControllers.getProduct)

routes.post("/review/:productId", verifyToken, productControllers.createReview)

module.exports = routes;