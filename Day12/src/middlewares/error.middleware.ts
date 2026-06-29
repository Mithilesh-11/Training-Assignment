import { Request, Response, NextFunction } from "express";
import multer from "multer";

import { AppError } from "../utils/AppError.js";

export const errorHandler = (err: Error,req: Request,res: Response,next: NextFunction): void => {
  
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    });

    return;
  }

  /**
   * Handle Multer Errors
   */
  if (err instanceof multer.MulterError) {
    let message = err.message;

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message ="File size exceeds the maximum allowed limit.";
        break;

      case "LIMIT_FILE_COUNT":
        message ="Too many files uploaded.";
        break;

      case "LIMIT_UNEXPECTED_FILE":
        message ="Unexpected file field.";
        break;

      default:
        message = err.message;
    }

    res.status(400).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    });

    return;
  }

  /**
   * Handle Cloudinary Errors
   */
  if ("http_code" in err) {
    res.status(500).json({
      success: false,
      message: "Cloudinary upload failed.",
      ...(process.env.NODE_ENV === "development" && {
        error: err,
      }),
    });

    return;
  }

  /**
   * Unknown Errors
   */
  res.status(500).json({
    success: false,
    message: "Internal Server Error.",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};