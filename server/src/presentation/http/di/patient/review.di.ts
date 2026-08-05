import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { PatientReviewController } from "../../controllers/patient/review.controller.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { PatientAddReviewUseCase } from "#application/use-cases/patient/review/addReview/PatientAddReviewUseCase.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";
import { ReviewRepository } from "#infrastructure/database/repositories/ReviewRepository.js";

const logger = PinoLoggerService.getInstance();
const patientRepo = new PatientRepository(logger);
const doctorRepo = new MongoDoctorRepository(logger);
const idGenerator = new NanoidGenerator();
const reviewRepository = new ReviewRepository(logger);
const appointmentRepo = new AppointmentRepository(logger);
const patientAddReviewUseCase = new PatientAddReviewUseCase(
  logger,
  patientRepo,
  doctorRepo,
  reviewRepository,
  appointmentRepo,
  idGenerator
);

export const patientReviewController = new PatientReviewController(
  patientAddReviewUseCase
);
