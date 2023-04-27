const express = require("express")
const routes = express.Router()

const productControllers = require('../controllers/product')
routes.get("/", productControllers.getProducts)
module.exports = routes;