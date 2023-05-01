const express = require("express")
const routes = express.Router()

const orderControllers = require("../controllers/order");
const verifyToken = require("../tokens/verifyToken");

routes.post("/", verifyToken, orderControllers.createOrder)

module.exports = routes;