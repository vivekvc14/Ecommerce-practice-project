const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next()
    }

    return res.status(400).json("Not authorized as an admin")
}

module.exports = verifyAdmin