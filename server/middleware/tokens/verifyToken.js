const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const verifyToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(500).json("Not Authorized");
    } else {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      if (!decoded) {
        return res.status(500).json("Not Authorized");
      }

      req.user = await User.findById(decoded.id);
      next();
    }
  } else {
    return res.status(500).json("Not Authorized");
  }
};

module.exports = verifyToken;
