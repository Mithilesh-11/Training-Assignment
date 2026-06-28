import {Request,Response, NextFunction} from "express";

export const errorMiddleware = ( error: any, req: Request,res: Response,next: NextFunction) => {
  const status = error.status || 500;
  const code = error.code ||"INTERNAL_SERVER_ERROR";
  const message = status >= 500 
    ? "An unexpected error occurred while processing the request."
    : error.message || "Bad request.";

    // Log the error on the server for debugging
  console.error(`[Error] ${req.method} ${req.url}:`, error);

  return res.status(status).json({
    success: false,
    data: null,
    error: {
      status,
      code,
      message
    }
  });
};