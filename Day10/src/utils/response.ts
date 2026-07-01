import { Response } from "express";

export const sendSuccessResponse = <T>(res: Response, statusCode: number,data: T,extra?: Record<string, unknown>): Response => {
  return res.status(statusCode).json({
    success: true,
    data,
    error: null,
    ...extra,
  });
};
