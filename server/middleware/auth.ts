import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
  user?: any;  // You can replace `any` with a custom type based on your JWT payload
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.path === '/login' || req.path === '/register') {
    return next();
  }

  const token = req.headers['authorization']?.split(' ')[1];  // "Bearer <token>"
  
  if (!token) {
    return res.status(403).json({ message: 'Authorization token is required' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log(decoded);
    req.user = decoded;  // Add decoded user info to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
