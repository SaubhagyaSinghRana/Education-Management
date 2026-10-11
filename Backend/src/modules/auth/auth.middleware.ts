import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

type UserRole = "admin" | "teacher" | "student";

interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const auth= (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token Missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = Jwt.verify(
      token||"",
      process.env.JWT_SECRET as string
    ) as unknown as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};