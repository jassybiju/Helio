import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { CheckBlockMiddleware } from "../middlewares/checkBlocked.middleware.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";

const logger = PinoLoggerService.getInstance();
const patientRepo = new PatientRepository(logger);
const doctorRepo = new MongoDoctorRepository(logger);

export const checkBlockMiddleware = new CheckBlockMiddleware(
  patientRepo,
  doctorRepo
);
