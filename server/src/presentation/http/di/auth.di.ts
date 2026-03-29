import { GetMeUseCase } from "@application/use-cases/auth/get-me/GetMeUseCase.ts";
import { AuthController } from "../controllers/auth.controller.ts";
import { PatientGetMeHandler } from "@application/use-cases/auth/get-me/PatientGetMeHandler.ts";
import { DoctorGetMeHandler } from "@application/use-cases/auth/get-me/DoctorGetMeHandler.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { MongoPatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { AdminGetMeHandler } from "@application/use-cases/auth/get-me/AdminGetMeHandler.ts";

const loggerService = new PinoLoggerService();

const patientRepo = new MongoPatientRepository(loggerService);
const doctorRepo = new MongoDoctorRepository(loggerService);

const doctorGetMeHandler = new DoctorGetMeHandler(doctorRepo);
const patientGetMeHandler = new PatientGetMeHandler(patientRepo);
const adminGetMeHandler = new AdminGetMeHandler();
const getMeUseCase = new GetMeUseCase(loggerService, [
  doctorGetMeHandler,
  patientGetMeHandler,
  adminGetMeHandler,
]);

export const authController = new AuthController(getMeUseCase);
