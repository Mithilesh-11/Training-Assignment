import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { UnauthorizedError, ForbiddenError } from "../errors/custom-errors";
import { UserTokenPayload } from "../types/auth.types";

export const authenticateToken = (req: Request,res: Response,next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Access token is missing", "TOKEN_MISSING");
  }

  try {
    const decoded = jwt.verify(token, config.jwtAccessSecret) as UserTokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired access token", "INVALID_ACCESS_TOKEN");
  }
};

export const requireRole = (allowedRoles: ("admin" | "user")[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError("Authentication required", "UNAUTHENTICATED");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError("Insufficient permissions to perform this action", "INSUFFICIENT_PERMISSIONS");
    }

    next();
  };
};
