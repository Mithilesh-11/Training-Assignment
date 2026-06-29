import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  data: unknown
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    error: null,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string
) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    error: message,
  });
};