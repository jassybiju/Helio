import { CompletePatientProfileUseCase } from "@application/use-cases/patient/profile/completeProfile/CompletePatientProfileUseCase.ts";
import { MongoPatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { PatientProfileController } from "../../controllers/patient/profile.controller.ts";

const loggerService = new PinoLoggerService();
const patientRepo = new MongoPatientRepository(loggerService);

const patientProfileCompleteUseCase = new CompletePatientProfileUseCase(
  loggerService,
  patientRepo
);

export const patientProfileController = new PatientProfileController(
  patientProfileCompleteUseCase
);
