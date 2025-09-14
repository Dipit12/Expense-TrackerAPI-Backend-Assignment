import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ msg: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SALT_KEY as string) as JwtPayload;
    (req as any).user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

export {authMiddleware}