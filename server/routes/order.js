const express = require("express")
const routes = express.Router()

const orderControllers = require("../controllers/order");
const verifyToken = require("../middleware/tokens/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

routes.post("/", verifyToken, orderControllers.createOrder)

routes.get("/:userId", verifyToken, orderControllers.getUserOrders)

routes.get("/", verifyToken, verifyAdmin, orderControllers.getOrders)

routes.delete("/:orderId", verifyToken, verifyAdmin, orderControllers.deleteOrder)

routes.put("/:orderId", verifyToken, verifyAdmin, orderControllers.updateOrder)

module.exports = routes;