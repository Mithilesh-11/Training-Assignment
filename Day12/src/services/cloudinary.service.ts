import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js";

interface UploadFileOptions {
  file: Express.Multer.File;
  folder: string;
  filename: string;
}

export class CloudinaryService {

  async uploadFile({ file, folder, filename }: UploadFileOptions): Promise<UploadApiResponse> {
  // 1. Convert your file buffer into a Base64 Data URI string
  const base64File = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  // 2. Now you can use clean, direct 'await' natively!
  const result = await cloudinary.uploader.upload(base64File, {
    folder,
    public_id: filename,
    resource_type: "auto",
    type: "upload",
    overwrite: false,
  });

  return result;
}


  async deleteFile( publicId: string,resourceType: "image" | "raw" | "video" = "image"): Promise<void> {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  }
}