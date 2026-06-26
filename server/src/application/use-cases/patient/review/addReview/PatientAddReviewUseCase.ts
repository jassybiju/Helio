import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IReviewRepository } from "@application/ports/repositories/IReviewRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IAddReview } from "@application/ports/use-cases/patient/review/IAddReview.ts";
import { Review } from "@domain/entities/Review.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ConflictError } from "@shared/errors/ConflictError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";

export class PatientAddReviewUseCase implements IAddReview {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _reviewRepo: IReviewRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _idGenerator: IIDGenerator
  ) {}
  async execute(
    patientId: string,
    doctorId: string,
    data: { comment: string; rating: number }
  ): Promise<void> {
    this._logger.info("Add Review Attempt", { patientId, doctorId, data });

    const patient = await this._patientRepo.findById(patientId);
    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
    }

    const doctor = await this._doctorRepo.findById(doctorId);
    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const countCompletedAppointments =
      await this._appointmentRepo.countCompletedAppointments(
        patientId,
        doctorId
      );

    if (countCompletedAppointments < 1) {
      throw new ConflictError(
        "Need to complete an appointment for adding review"
      );
    }

    const countNumberOfReviews =
      await this._reviewRepo.countReviewByPatientIdAndDoctorId(
        patient.id,
        doctor.id
      );
    if (countNumberOfReviews > 1) {
      throw new ConflictError("Only One Review is possible");
    }

    const reviewId = this._idGenerator.generate(process.env.REVIEW_PREFIX!);
    const review = Review.create({
      id: reviewId,
      doctorId: doctor.id,
      patientId: patient.id,
      rating: data.rating,
      comments: data.comment,
    });

    await this._reviewRepo.create(review);
  }
}
