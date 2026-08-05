import { GetVerificationDetailsUseCase } from "#application/use-cases/doctor/verification/getVerificationDetails/GetVerificationDetailsUseCase.js";
import { DoctorVerificationController } from "../../controllers/doctor/verification.controller.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { ResubmitVerificationUseCase } from "#application/use-cases/doctor/verification/resubmitVerification/ResubmitVerificationUseCase.js";
import { CloudinaryFileUploadService } from "#infrastructure/services/CloudinaryFileUploadService.js";
const loggerService = PinoLoggerService.getInstance();
const doctorRepo = new MongoDoctorRepository(loggerService);
const fileService = new CloudinaryFileUploadService();
const getVerificationDetailsUseCase = new GetVerificationDetailsUseCase(loggerService, doctorRepo, fileService);
const resubmitVerificationUseCase = new ResubmitVerificationUseCase(loggerService, doctorRepo, fileService);
export const doctorVerificationController = new DoctorVerificationController(getVerificationDetailsUseCase, resubmitVerificationUseCase);
//# sourceMappingURL=verification.di.js.map