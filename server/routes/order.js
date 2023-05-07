const express = require("express")
const routes = express.Router()

const orderControllers = require("../controllers/order");
const verifyToken = require("../middleware/tokens/verifyToken");

routes.post("/", verifyToken, orderControllers.createOrder)

routes.get("/:userId", verifyToken, orderControllers.getOrders)

module.exports = routes;