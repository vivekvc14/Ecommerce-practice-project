const Product = require("../models/Product");
const User = require("../models/User");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (product) {
    res.json(product);
  } else {
    return res.status(404).json("Product not found");
  }
};

exports.createReview = async (req, res) => {
  const { userId, rating, title, comment } = req.body;
  try {
    const product = await Product.findById(req.params.productId);
    const user = await User.findById(userId);
    if (req.user._id.toString() === user._id.toString()) {
      if (product) {
        const alreadyReviewed = product.reviews.find(
          (review) => review.user.toString() === user._id.toString()
        );
        if (alreadyReviewed) {
          return res.status(400).json("Product already reviewed");
        }

        const review = {
          name: user.name,
          rating,
          comment,
          title,
          user: user._id,
        };

        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce(
            (total, review) => (total += review.rating),
            0
          ) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review has been saved!" });
      } else {
        return res.status(404).json("Product not found!");
      }
    } else {
      return res.status(402).json("You are not authorized.");
    }
  } catch (error) {
    res.status(500).json("Something went wrong, please try again.");
  }
};

exports.createProduct = async (req, res) => {
  const {
    brand,
    name,
    category,
    price,
    image,
    productIsNew,
    description,
    stock,
  } = req.body;
  try {
    const product = await Product.create({
      brand,
      name,
      description,
      category,
      price,
      image: "/images/" + image,
      productIsNew,
      stock,
    });

    return res.status(201).json(product);
  } catch (error) {
    res.status(500).json("Something went wrong, please try again.");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    return res.json("Product deleted successfully!");
  } catch (error) {
    res.status(500).json("Something went wrong, please try again.");
  }
};

exports.updateProduct = async (req, res) => {
  const {
    brand,
    name,
    category,
    price,
    image,
    productIsNew,
    description,
    stock,
  } = req.body;
  try {
    const product = await Product.findById(req.params.productId);
    product.brand = brand;
    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;
    product.image = "/images/" + image;
    product.productIsNew = productIsNew;
    product.stock = stock;

    await product.save();
    return res.json(product);
  } catch (error) {
    res.status(500).json("Something went wrong, please try again.");
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const updatedReviews = product.reviews.filter(
      (review) => review._id.toString() !== req.params.reviewId.toString()
    );

    if (product) {
      product.reviews = updatedReviews;
      product.numberOfReviews = product.reviews.length;

      if (product.numberOfReviews > 0) {
        product.rating =
          product.reviews.reduce((item, acc) => (item.rating += acc), 0) /
          product.reviews.length;
        product.numberOfReviews -= 1;
      } else {
        product.rating = 0;
      }

      await product.save();
      return res.json("Review has been removed.");
    } else {
      return res.status(404).json("Produt not found.");
    }
  } catch (error) {
    res.status(500).json("Something went wrong, please try again.");
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Product.find().select("reviews name");
    return res.json(reviews);
  } catch (error) {
    res.status(500).json("Something went wrong, please try again.");
  }
};

exports.reviewDeleteByUser = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const product = await Product.findById(productId);
    if (product) {
      product.reviews = product?.reviews?.filter((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          return review._id.toString() !== reviewId.toString();
        }
      });
      product.numberOfReviews = product.reviews.length;
      if (product.numberOfReviews > 0) {
        product.rating =
          product.reviews.reduce((item, acc) => (item.rating += acc), 0) /
          product.reviews.length;
        product.numberOfReviews -= 1;
      } else {
        product.rating = 0;
      }
      await product.save();
      return res.json(product);
    } else {
      return res.status(404).json("Product not found.");
    }
  } catch (error) {
    res.status(500).json("Something went wrong, please try again.");
  }
};
