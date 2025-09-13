import jwt from "jsonwebtoken";
import User from "../Model/User.js";

const authMiddleware = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
