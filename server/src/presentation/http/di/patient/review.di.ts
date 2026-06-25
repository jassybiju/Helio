import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { PatientReviewController } from "../../controllers/patient/review.controller.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { PatientAddReviewUseCase } from "@application/use-cases/patient/review/addReview/PatientAddReviewUseCase.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { ReviewRepository } from "@infrastructure/database/repositories/ReviewRepository.ts";

const logger = new PinoLoggerService();
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
