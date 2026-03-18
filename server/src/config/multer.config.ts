import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { logger } from "@shared/utils/logger.utils.ts";
import multer from "multer";

export const documentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    logger.debug("Uploaded file",file)
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(
        new AppError(
          "Only PDF document allowed",
          HTTPStatus.UNPROCESSBLE_ENTITY
        )
      );
    }
  },
});
