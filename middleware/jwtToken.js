const jwt = require('jsonwebtoken');
require("dotenv").config();

// 1. Token Authentication
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;
  console.log("Token:", token); 
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

// 2. Admin Verification
const verifyAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.redirect("/login");
    }
  });
};

module.exports = { authenticateToken, verifyAdmin };