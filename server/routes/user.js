const routes = require("express").Router()
const { body } = require("express-validator")

const userControllers = require("../controllers/user")
const verifyToken = require("../middleware/tokens/verifyToken")
const verifyAdmin = require("../middleware/verifyAdmin")

routes.post("/register", [
    body("name").not().isEmpty().withMessage("Enter a name!"),
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password").isLength({ min: 8, max: 20 }).withMessage("Password should contain between 8 to 20 characters."),
], userControllers.registerUser)

routes.post("/login", userControllers.loginUser)

routes.put("/profile/:userId", verifyToken, userControllers.updateUser)

routes.get("/", verifyToken, verifyAdmin, userControllers.getUsers)

routes.delete("/:userId", verifyToken, verifyAdmin, userControllers.deleteUser)

module.exports = routes;
