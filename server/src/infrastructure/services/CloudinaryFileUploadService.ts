import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";
import streamifier from "streamifier";
export class CloudinaryFileUploadService implements IFileUpload {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
    });
  }

  async upload(
    document: {
      buffer: Buffer;
      mimetype: string;
      originalname: string;
    },
    secured: boolean = false
  ): Promise<string> {
    // const extension = path.extname(document.originalname);
    // const format = extension.replace(".", "");
    const publicId = randomUUID();

    // const uniqueFileName = `${randomUUID()}${extension}`;
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          public_id: publicId,
          type: secured ? "authenticated" : "upload",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error("Upload Failed"));
          }

          resolve(result.public_id);
        }
      );

      streamifier.createReadStream(document.buffer).pipe(uploadStream);
    });
  }

  getFileUrl(filename: string, secured: boolean = false): string {
    return cloudinary.url(filename, {
      secure: true,
      resource_type: "image",
      sign_url: secured,
      type: secured ? "authenticated" : "upload",
    });
  }
}
