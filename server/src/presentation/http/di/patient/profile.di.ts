import { CompletePatientProfileUseCase } from "@application/use-cases/patient/profile/completeProfile/CompletePatientProfileUseCase.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { PatientProfileController } from "../../controllers/patient/profile.controller.ts";
import { GetPatientProfileUseCase } from "@application/use-cases/patient/profile/getPatientProfile/GetPatientProfileUseCase.ts";
import { AddPatientAllergenUseCase } from "@application/use-cases/patient/profile/addPatientAllergen/AddPatientAllergenUseCase.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { RemovePatientAllergenUseCase } from "@application/use-cases/patient/profile/removePatientAllergen/RemovePatientAllergenUseCase.ts";
import { logger } from "@shared/utils/logger.utils.ts";
import { AddPatientConditionUseCase } from "@application/use-cases/patient/profile/addPatientCondition/AddPatientConditionUseCase.ts";
import { RemovePatientConditionUseCase } from "@application/use-cases/patient/profile/removePatientCondition/RemovePatientConditionUseCase.ts";
import { ChangePasswordUseCase } from "@application/use-cases/patient/profile/changePassword/ChangePasswordUseCase.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { PatientValidator } from "@application/validators/PatientValidator.ts";
import { UpdatePatientProfileUseCase } from "@application/use-cases/patient/profile/updatePatientProfile/UpdatePatientProfileUseCase.ts";
import { PatientUpdateProfilePictureUseCase } from "@application/use-cases/patient/updateProfilePic/PatientUpdateProfilePictureUseCase.ts";
import { CloudinaryFileUploadService } from "@infrastructure/services/CloudinaryFileUploadService.ts";

const loggerService = new PinoLoggerService();
const patientRepo = new PatientRepository(loggerService);
const idGenerator = new NanoidGenerator();
const bcryptPasswordService = new BcryptPasswordService();
const fileUpload = new CloudinaryFileUploadService();

const patientProfileCompleteUseCase = new CompletePatientProfileUseCase(
  loggerService,
  patientRepo
);
const patientGetProfileUseCase = new GetPatientProfileUseCase(
  loggerService,
  patientRepo,
  fileUpload
);
const patientAddAllergenUseCase = new AddPatientAllergenUseCase(
  loggerService,
  patientRepo,
  idGenerator
);
const patientRemoveAllergenUseCase = new RemovePatientAllergenUseCase(
  logger,
  patientRepo
);
const patientAddConditionUseCase = new AddPatientConditionUseCase(
  logger,
  patientRepo,
  idGenerator
);
const patientRemoveConditionUseCase = new RemovePatientConditionUseCase(
  logger,
  patientRepo
);
const patientChangePasswordUseCase = new ChangePasswordUseCase(
  logger,
  patientRepo,
  bcryptPasswordService,
  new PatientValidator(patientRepo, bcryptPasswordService)
);
const patientUpdateProfileUseCase = new UpdatePatientProfileUseCase(
  logger,
  patientRepo
);
const patientUpdateProfilePicUseCase = new PatientUpdateProfilePictureUseCase(
  logger,
  patientRepo,
  fileUpload
);

export const patientProfileController = new PatientProfileController(
  patientProfileCompleteUseCase,
  patientGetProfileUseCase,
  patientAddAllergenUseCase,
  patientRemoveAllergenUseCase,
  patientAddConditionUseCase,
  patientRemoveConditionUseCase,
  patientChangePasswordUseCase,
  patientUpdateProfileUseCase,
  patientUpdateProfilePicUseCase
);
