declare global {
  namespace Express {
    interface Request {
      user?: {
        id_user: number;
        role: string;
      };
    }
  }
}

import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'

interface JwtPayloadCustom {
  id_user: number;
  role: string;
  iat?: number;
  exp?: number;
}

export default function jwtMiddleware(req:Request, res:Response, next:NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, secret) as JwtPayloadCustom;
     req.user = {
      id_user: decoded.id_user,
      role: decoded.role
    };
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Invalid token" });
  } 
};
