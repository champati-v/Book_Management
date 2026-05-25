const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  try {

    // Get token from cookies
    const token = req.cookies.token;

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user
    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

  }
};

module.exports = protect;