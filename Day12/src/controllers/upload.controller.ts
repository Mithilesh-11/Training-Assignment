import { Request, Response, NextFunction } from "express";
import { UploadService } from "../services/upload.service.js";
import { AppError } from "../utils/AppError.js";

const uploadService = new UploadService();

/**
 * Upload Profile Image
 * POST /upload/profile
 */
export const uploadProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded.", 400);
    }

    /**
     * Temporary user ID.
     * Replace this after authentication.
     */
    const userId = 1;

    const result = await uploadService.uploadProfile({file: req.file,userId,});

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload Document
 * POST /upload/document
 */
export const uploadDocument = async (req: Request,res: Response,next: NextFunction)=> {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded.", 400);
    }

    /**
     * Temporary user ID.
     * Replace after authentication.
     */
    const userId = 1;

    const result = await uploadService.uploadDocument({
      file: req.file,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "Document uploaded successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
