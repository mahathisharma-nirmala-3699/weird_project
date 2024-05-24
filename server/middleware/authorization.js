// authorization.js
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

function authorization(req, res, next) {
  // Get token from header
  const token = req.header("token");

  // Check if no token
  if (!token) {
    console.log("No token provided");
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    console.log("Verifying token:", token);
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verification successful");
    req.user = verify.user;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
}


export default authorization;
