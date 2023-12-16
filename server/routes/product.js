const express = require("express");
const routes = express.Router();

const productControllers = require("../controllers/product");
const verifyToken = require("../middleware/tokens/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

routes.get("/", productControllers.getProducts);

routes.get("/reviews", verifyToken, verifyAdmin, productControllers.getReviews);

routes.get("/:productId", productControllers.getProduct);

routes.post("/review/:productId", verifyToken, productControllers.createReview);

routes.delete(
  "/review-delete",
  verifyToken,
  productControllers.reviewDeleteByUser
);

routes.delete(
  "/:productId/:reviewId",
  verifyToken,
  verifyAdmin,
  productControllers.deleteReview
);

routes.post("/", verifyToken, verifyAdmin, productControllers.createProduct);

routes.delete(
  "/:productId",
  verifyToken,
  verifyAdmin,
  productControllers.deleteProduct
);

routes.put(
  "/:productId",
  verifyToken,
  verifyAdmin,
  productControllers.updateProduct
);

module.exports = routes;
