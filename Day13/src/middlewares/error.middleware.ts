import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
}