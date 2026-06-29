export type UploadCategory =
  | "profile"
  | "document";

export interface UploadOptions {
  file: Express.Multer.File;
  userId: number;
}

export interface UploadFileOptions {
  file: Express.Multer.File;
  folder: string;
  filename: string;
}

export interface UploadResponse {
  url: string;
  publicId: string;
  folder: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}