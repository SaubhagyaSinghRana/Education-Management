import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/auth.middleware";

type UserRole = "admin" | "teacher" | "student";


export const authorize = (
  ...roles:UserRole[]
) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};