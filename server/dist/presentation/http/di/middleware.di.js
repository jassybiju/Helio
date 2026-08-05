import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { CheckBlockMiddleware } from "../middlewares/checkBlocked.middleware.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
const logger = PinoLoggerService.getInstance();
const patientRepo = new PatientRepository(logger);
const doctorRepo = new MongoDoctorRepository(logger);
export const checkBlockMiddleware = new CheckBlockMiddleware(patientRepo, doctorRepo);
//# sourceMappingURL=middleware.di.js.map