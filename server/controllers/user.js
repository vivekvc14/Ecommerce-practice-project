const User = require("../models/User")
const asyncHandler = require("express-async-handler")
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const genToken = require("../middleware/tokens/genToken")


exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(422).json(error.array()[0].msg)
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(403).json("User with that email address already exists.")
        }
        const securedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, password: securedPassword
        })

        await newUser.save()

        return res.status(201).json("Register user successfully")
    } catch (err) {
        res.status(500).json("Something went wrong, please try again!")
    }
})

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json("Invalid email or password")
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(403).json("Invalid email or password")
        }

        return res.json({
            id: user._id,
            isAdmin: user.isAdmin,
            name: user.name,
            email: user.email,
            token: genToken(user._id),
            createdAt: user.createdAt
        })

    } catch (err) {
        res.status(500).json("Something went wrong, please try again!")
    }
})

exports.updateUser = asyncHandler(async (req, res) => {
    try {

        const user = await User.findById(req.params.userId)
        if (!user) {
            return res.status(404).json("User doesn't exist!")
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10)
        }
        const updatedUser = await user.save()

        return res.status(201).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            createdAt: updatedUser.createdAt,
            token: genToken(updatedUser._id),
        })
    } catch (err) {
        return res.status(500).json("Something went wrong, please try again!")
    }
})

exports.getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
})

exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId)
        return res.json("User deleted successfully")
    } catch (error) {
        return res.status(500).json("Something went wrong, please try again!")
    }
})