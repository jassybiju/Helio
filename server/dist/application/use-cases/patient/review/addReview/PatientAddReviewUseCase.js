import { Review } from "#domain/entities/Review.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class PatientAddReviewUseCase {
    _logger;
    _patientRepo;
    _doctorRepo;
    _reviewRepo;
    _appointmentRepo;
    _idGenerator;
    constructor(_logger, _patientRepo, _doctorRepo, _reviewRepo, _appointmentRepo, _idGenerator) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._doctorRepo = _doctorRepo;
        this._reviewRepo = _reviewRepo;
        this._appointmentRepo = _appointmentRepo;
        this._idGenerator = _idGenerator;
    }
    async execute(patientId, doctorId, data) {
        this._logger.info("Add Review Attempt", { patientId, doctorId, data });
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
        }
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const countCompletedAppointments = await this._appointmentRepo.countCompletedAppointments(patientId, doctorId);
        if (countCompletedAppointments < 1) {
            throw new ConflictError("Need to complete an appointment for adding review");
        }
        const countNumberOfReviews = await this._reviewRepo.countReviewByPatientIdAndDoctorId(patient.id, doctor.id);
        if (countNumberOfReviews > 1) {
            throw new ConflictError("Only One Review is possible");
        }
        const reviewId = this._idGenerator.generate(process.env.REVIEW_PREFIX);
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
//# sourceMappingURL=PatientAddReviewUseCase.js.map