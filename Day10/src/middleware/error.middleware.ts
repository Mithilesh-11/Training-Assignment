import {Request,Response, NextFunction} from "express";
import { AppError } from "../errors/custom-errors";

export const errorMiddleware = (error: unknown,req: Request,res: Response,next: NextFunction) => {
  let status = 500;
  let code = "INTERNAL_SERVER_ERROR";
  let message ="An unexpected error occurred while processing the request.";

  if (error instanceof AppError) {
    status = error.status;
    code = error.code;
    message = error.message;
  } else if (error instanceof Error) {
    // Unexpected runtime error
    message =
      status >= 500
        ? "An unexpected error occurred while processing the request."
        : error.message;
  }

  console.error(`[Error] ${req.method} ${req.url}:`, error);

  return res.status(status).json({
    success: false,
    data: null,
    error: {
      status,
      code,
      message,
    },
  });
};