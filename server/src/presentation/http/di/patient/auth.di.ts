import { RegisterPatientUseCase } from "@application/use-cases/patient/auth/RegisterPatientUseCase.ts";
import { PatientAuthController } from "../../controllers/patient/auth.controller.ts";
import { PatientValidator } from "@application/validators/PatientValidator.ts";
import { MongoPatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";

const loggerService = new PinoLoggerService();
const bcryptPasswordService = new BcryptPasswordService()
const nanoidGenerator = new NanoidGenerator()

const patientRepo = new MongoPatientRepository(loggerService);

const registerPatientUseCase = new RegisterPatientUseCase(
  new PatientValidator(),
  patientRepo,
  bcryptPasswordService,
  nanoidGenerator,
  loggerService,
  
);

export const authController = new PatientAuthController();
