const express = require("express")
const routes = express.Router()

const productControllers = require('../controllers/product')

routes.get("/", productControllers.getProducts)

routes.get("/:productId", productControllers.getProduct)

module.exports = routes;