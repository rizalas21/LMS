const jwt = require("jsonwebtoken");

async function AuthenticateToken(req, res, next) {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    const verify = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verify;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = AuthenticateToken;
