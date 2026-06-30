import { AppError } from "../utils/AppError.js";
import { generateFolder } from "../utils/generateFolder.js";
import { generateFilename } from "../utils/generateFilename.js";
import { CloudinaryService } from "./cloudinary.service.js";
import { RetryService } from "./retry.service.js";
import type { UploadOptions, UploadResponse, UploadCategory } from "../interfaces/upload.interface.js";

export class UploadService {
  private readonly cloudinaryService =new CloudinaryService();
  private readonly retryService =new RetryService();

  /**
   * Upload Profile Image
   */
  async uploadProfile(options: UploadOptions): Promise<UploadResponse> {
    return this.upload(options, "profile");
  }

  /**
   * Upload Document
   */
  async uploadDocument(options: UploadOptions): Promise<UploadResponse> {
    return this.upload(options, "document");
  }

  /**
   * Common Upload Logic
   */
  private async upload(options: UploadOptions, category: UploadCategory): Promise<UploadResponse> {
    const { file, userId } = options;

    if (!file) {
      throw new AppError("No file uploaded.",400);
    }

    /**
     * uploads/profile/12/2026/06/26
     */
    const folder = generateFolder( userId , category );
    /**
     * UUID-avatar.png
     */
    const filename =generateFilename( file.originalname);

    /**
     * Upload to Cloudinary
     * with automatic retry.
     */
    const uploadResult = await this.retryService.execute(
      () => this.cloudinaryService.uploadFile({file,folder,filename,})
      );

      console.log(uploadResult);
    
      return {
      url: uploadResult.secure_url,
      publicId:uploadResult.public_id,
      folder,
      originalName:file.originalname,
      fileName: filename,
      mimeType:file.mimetype,
      size: file.size,
      resourceType: uploadResult.resource_type,
    };
  }
}