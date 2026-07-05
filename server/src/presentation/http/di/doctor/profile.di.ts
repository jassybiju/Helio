import { CompleteDoctorProfileUseCase } from "@application/use-cases/doctor/profile/CompleteDoctorProfileUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { DoctorProfileController } from "../../controllers/doctor/profile.controller.ts";
import { GetDoctorProfileUseCase } from "@application/use-cases/doctor/profile/getDoctorProfile/GetDoctorProfileUseCase.ts";
import { UpdateDoctorFeeUseCase } from "@application/use-cases/doctor/profile/updateDoctorFee/UpdateDoctorFeeUseCase.ts";
import { UpdateDoctorProfileUseCase } from "@application/use-cases/doctor/profile/updateDoctorProfile/UpdateDoctorProfileUseCase.ts";
import { ChangeDoctorPasswordUseCase } from "@application/use-cases/doctor/profile/changePassword/DoctorChangePasswordUseCase.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { DoctorValidator } from "@application/validators/DoctorValidator.ts";
import { CloudinaryFileUploadService } from "@infrastructure/services/CloudinaryFileUploadService.ts";
import { DoctorUpdateProfilePictureUseCase } from "@application/use-cases/doctor/profile/updateProfilePicture/DoctorUpdateProfilePictureUseCase.ts";

const loggerService = PinoLoggerService.getInstance();
const doctorRepo = new MongoDoctorRepository(loggerService);
const fileUpload = new CloudinaryFileUploadService();
const passwordService = new BcryptPasswordService();
const doctorValidator = new DoctorValidator(doctorRepo, passwordService);

const doctorProfileCompleteUseCase = new CompleteDoctorProfileUseCase(
  loggerService,
  doctorRepo,
  fileUpload
);
const doctorGetProfileUseCase = new GetDoctorProfileUseCase(
  loggerService,
  doctorRepo,
  fileUpload
);
const doctorUpdateFeeUseCase = new UpdateDoctorFeeUseCase(
  loggerService,
  doctorRepo
);
const doctorUpdateProfileUseCase = new UpdateDoctorProfileUseCase(
  loggerService,
  doctorRepo
);
const doctorChangePasswordUseCase = new ChangeDoctorPasswordUseCase(
  loggerService,
  doctorRepo,
  passwordService,
  doctorValidator
);

const updateProfilePicUseCase = new DoctorUpdateProfilePictureUseCase(
  loggerService,
  doctorRepo,
  fileUpload
);
export const doctorProfileController = new DoctorProfileController(
  doctorProfileCompleteUseCase,
  doctorGetProfileUseCase,
  doctorUpdateFeeUseCase,
  doctorUpdateProfileUseCase,
  doctorChangePasswordUseCase,
  updateProfilePicUseCase
);
