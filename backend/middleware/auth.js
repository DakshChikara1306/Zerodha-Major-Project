const jwt = require("jsonwebtoken");

/**
 * Auth middleware
 * - Reads JWT from httpOnly cookie
 * - Verifies token
 * - Attaches userId to request
 */
const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  // No token → not logged in
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId for downstream routes
    req.userId = decoded.userId;
    next();
  } catch (err) {
    // Token expired / invalid
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
