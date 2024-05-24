import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id
  };

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    console.error("JWT_SECRET is not defined in the environment variables");
    return null; 
  }

  return jwt.sign(payload, secretKey, { expiresIn: "1min" });
  
}

export default jwtGenerator;
