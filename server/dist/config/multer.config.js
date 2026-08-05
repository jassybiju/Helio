import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { logger } from "#shared/utils/logger.utils.js";
import multer from "multer";
export const documentUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        logger.debug("Uploaded file", file);
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(new AppError("Only PDF document allowed", HTTPStatus.UNPROCESSBLE_ENTITY));
        }
    },
});
export const imageUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new AppError("Only JPG / PNG file allowed", HTTPStatus.UNPROCESSBLE_ENTITY));
        }
    },
});
//# sourceMappingURL=multer.config.js.map