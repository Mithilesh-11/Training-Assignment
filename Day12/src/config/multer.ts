import multer from "multer";

export const createMulter = (fileSize: number, fileFilter: multer.Options["fileFilter"]) => {
  return multer({
    storage: multer.memoryStorage(),
    limits: {fileSize, },
    fileFilter,
  });
};