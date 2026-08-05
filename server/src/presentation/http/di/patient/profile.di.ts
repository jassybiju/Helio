import { CompletePatientProfileUseCase } from "#application/use-cases/patient/profile/completeProfile/CompletePatientProfileUseCase.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { PatientProfileController } from "../../controllers/patient/profile.controller.js";
import { GetPatientProfileUseCase } from "#application/use-cases/patient/profile/getPatientProfile/GetPatientProfileUseCase.js";
import { AddPatientAllergenUseCase } from "#application/use-cases/patient/profile/addPatientAllergen/AddPatientAllergenUseCase.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { RemovePatientAllergenUseCase } from "#application/use-cases/patient/profile/removePatientAllergen/RemovePatientAllergenUseCase.js";
import { logger } from "#shared/utils/logger.utils.js";
import { AddPatientConditionUseCase } from "#application/use-cases/patient/profile/addPatientCondition/AddPatientConditionUseCase.js";
import { RemovePatientConditionUseCase } from "#application/use-cases/patient/profile/removePatientCondition/RemovePatientConditionUseCase.js";
import { ChangePasswordUseCase } from "#application/use-cases/patient/profile/changePassword/ChangePasswordUseCase.js";
import { BcryptPasswordService } from "#infrastructure/services/BcryptPasswordService.js";
import { PatientValidator } from "#application/validators/PatientValidator.js";
import { UpdatePatientProfileUseCase } from "#application/use-cases/patient/profile/updatePatientProfile/UpdatePatientProfileUseCase.js";
import { PatientUpdateProfilePictureUseCase } from "#application/use-cases/patient/updateProfilePic/PatientUpdateProfilePictureUseCase.js";
import { CloudinaryFileUploadService } from "#infrastructure/services/CloudinaryFileUploadService.js";

const loggerService = PinoLoggerService.getInstance();
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
