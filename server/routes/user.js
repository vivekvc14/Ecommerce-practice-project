const routes = require("express").Router()
const { body } = require("express-validator")

const userControllers = require("../controllers/user")
const verifyToken = require("../tokens/verifyToken")

routes.post("/register", [
    body("name").not().isEmpty().withMessage("Enter a name!"),
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password").isLength({ min: 8, max: 20 }).withMessage("Password should contain between 8 to 20 characters."),
], userControllers.registerUser)

routes.post("/login", userControllers.loginUser)

routes.put("/profile/:userId", verifyToken, userControllers.updateUser)

module.exports = routes;
