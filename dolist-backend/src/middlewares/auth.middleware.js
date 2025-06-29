import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/apiResponse.js";
import User from '../models/user.model.js';

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return errorResponse(req, res, { type: "UNAUTHORIZED" });

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedData?.user_id)
      .select('-user_refreshToken -user_password');

    if (!user) return errorResponse(req, res, { type: "INVALID_TOKEN" })

    req.user = user;
    next();
  } catch (error) {
    const errorType = error.name === "TokenExpiredError" ? "TOKEN_EXPIRED" : "INVALID_TOKEN";
    return errorResponse(req, res, { type: errorType });
  }
}

const roleValidator = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.user_role)) {
      next();
    } else {
      return errorResponse(req, res, { type: "FORBIDDEN" });
    }
  }
}

export { verifyToken, roleValidator };
