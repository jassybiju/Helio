import type { IFileUpload } from "#application/ports/services/IFileUpload.js";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  type GetObjectCommandInput,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
export class S3FileUploadService implements IFileUpload {
  constructor() {}
  async upload(_document: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  }): Promise<string> {
    if (!s3Client) {
      throw new Error("CONFIG NOT SET");
    }
    const key = `${Date.now()}-${_document.originalname}`;
    const params: PutObjectCommandInput = {
      Bucket: "bucket.helixo.private",
      Key: key,
      Body: _document.buffer,
      ContentType: _document.mimetype,
    };

    const cmd = new PutObjectCommand(params);
    const data = await s3Client.send(cmd);

    console.log("AWS RESPONSE", data);
    return key;
  }

  async getFileUrl(_key: string): Promise<string> {
    if (!s3Client) {
      throw new Error("CONFIG NOT SET");
    }

    const getObjectParams: GetObjectCommandInput = {
      Bucket: "bucket.helixo.private",
      Key: _key,
    };
    const cmd = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3Client, cmd, { expiresIn: 3600 });
    return url;
  }
}
