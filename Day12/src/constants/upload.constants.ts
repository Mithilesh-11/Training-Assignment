/**
 * Multer Field Name
 */
export const FILE_FIELD_NAME = "file";

/**
 * Maximum Upload Size
 */
export const IMAGE_MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export const DOCUMENT_MAX_SIZE = 10 * 1024 * 1024; // 10 MB

/**
 * Allowed Image MIME Types
 */
export const IMAGE_MIME_TYPES: string[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const DOCUMENT_MIME_TYPES: string[] = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * Upload Categories
 */
export const UPLOAD_CATEGORIES = {
  PROFILE: "profile",
  DOCUMENT: "document",
} as const;

/**
 * Success Messages
 */
export const UPLOAD_SUCCESS_MESSAGES = {
  PROFILE: "Profile image uploaded successfully.",
  DOCUMENT: "Document uploaded successfully.",
} as const;

/**
 * Validation Error Messages
 */
export const UPLOAD_ERROR_MESSAGES = {
  NO_FILE: "No file uploaded.",

  INVALID_IMAGE:
    "Only JPEG, PNG and WEBP images are allowed.",

  INVALID_DOCUMENT:
    "Only PDF, DOC and DOCX files are allowed.",

  FILE_TOO_LARGE:
    "Maximum upload size exceeded.",
} as const;