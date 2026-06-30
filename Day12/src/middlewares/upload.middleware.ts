import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { createMulter } from "../config/multer.js";
import {DOCUMENT_MAX_SIZE,DOCUMENT_MIME_TYPES,FILE_FIELD_NAME, IMAGE_MAX_SIZE,IMAGE_MIME_TYPES,} from "../constants/upload.constants.js";
import { AppError } from "../utils/AppError.js";
import { fileTypeFromBuffer } from "file-type";

/**
 * Pre-filter: Fast check on client-provided metadata before consuming memory.
 * This prevents obviously malicious extensions/types from wasting server RAM.
 */
const initialFileFilter = (allowedMimeTypes: string[]) => {
  return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new AppError(`Invalid file type provided in headers.`, 400) as any);
    }
    cb(null, true);
  };
};
 
// --- Raw Multer Instances ---
const multerImageUpload = createMulter(IMAGE_MAX_SIZE, initialFileFilter(IMAGE_MIME_TYPES)).single(FILE_FIELD_NAME);
const multerDocumentUpload = createMulter(DOCUMENT_MAX_SIZE, initialFileFilter(DOCUMENT_MIME_TYPES)).single(FILE_FIELD_NAME);

/**
 * 🛡️ Secure Image Validation Middleware
 * Checks the true magic bytes of the populated memory buffer.
 */
export const uploadProfileMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  multerImageUpload(req, res, async (err) => {
    if (err) return next(err);
    if (!req.file) return next(new AppError("No file uploaded.", 400));

    try {
      // Deep scan the magic bytes in memory
      const detected = await fileTypeFromBuffer(req.file.buffer);
      
      if (!detected || !IMAGE_MIME_TYPES.includes(detected.mime)) {
        return next(new AppError("Security Alert: Only authentic JPEG, PNG, and WEBP images are allowed.", 400));
      }

      next();
    } catch (error) {
      return next(new AppError("Error validating image integrity.", 500));
    }
  });
};

/**
 * 🛡️ Secure Document Validation Middleware
 * Checks the true magic bytes of the populated memory buffer.
 */
export const uploadDocumentMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  multerDocumentUpload(req, res, async (err) => {
    if (err) return next(err);
    if (!req.file) return next(new AppError("No file uploaded.", 400));

    try {
      // Deep scan the magic bytes in memory
      const detected = await fileTypeFromBuffer(req.file.buffer);

       if (!detected || !DOCUMENT_MIME_TYPES.includes(detected.mime)) {
        return next(new AppError("Only PDF, DOC, and DOCX files are allowed.", 400));
      }

      next();
    } catch (error) {
      return next(new AppError("Error validating document integrity.", 500));
    }
  });
};
