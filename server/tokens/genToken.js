const jwt = require("jsonwebtoken")

const genToken = id => {
    // Change expiresIn later
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "60d" })
}

module.exports = genToken;