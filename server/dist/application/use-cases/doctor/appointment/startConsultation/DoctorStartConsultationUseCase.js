import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import { Consultation } from "#domain/entities/Consultation.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class DoctorStartConsultationUseCase {
    _logger;
    _doctorRepo;
    _appointmentRepo;
    _consultationRepo;
    _idGenerator;
    _uow;
    constructor(_logger, _doctorRepo, _appointmentRepo, _consultationRepo, _idGenerator, _uow) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._appointmentRepo = _appointmentRepo;
        this._consultationRepo = _consultationRepo;
        this._idGenerator = _idGenerator;
        this._uow = _uow;
    }
    async execute(doctorId, appointmentId) {
        this._logger.info("Doctor Start Consultation", { doctorId, appointmentId });
        return await this._uow.execute(async (session) => {
            const doctorRepo = this._doctorRepo.withSession(session);
            const appointmentRepo = this._appointmentRepo.withSession(session);
            const consultationRepo = this._consultationRepo.withSession(session);
            // checking if doctor exists
            const doctor = await doctorRepo.findById(doctorId);
            if (!doctor) {
                throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
            }
            // checking if appointment exists
            const appointment = await appointmentRepo.findById(appointmentId);
            if (!appointment) {
                throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
            }
            if (appointment.doctorId !== doctor.id) {
                throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
            }
            // checking if consultation exists
            const existingConsultation = await consultationRepo.findByAppointmentId(appointment.id);
            if (existingConsultation) {
                throw new ConflictError("Consultation with the appointmentId already exists");
            }
            // checking if doctor is currently doing an appointment
            const ongoingAppointment = await appointmentRepo.findOngoingAppointmentByDoctor(doctorId);
            if (ongoingAppointment) {
                throw new ConflictError("Another consultation is already ongoing");
            }
            // checking if next appointment exists
            const fakeDate = new Date();
            fakeDate.setDate(fakeDate.getDate() + 1);
            // const date = new Date()
            this._logger.error("For Debug I set date + 2 in start consultation change on prod");
            const nextQueueAppointment = await appointmentRepo.findNextQueueAppointment(doctorId, fakeDate);
            this._logger.debug("Next Queue", nextQueueAppointment);
            if (!nextQueueAppointment) {
                throw new ConflictError("No appointment available in queue");
            }
            const startable = [];
            let isSeenConfirmed = false;
            for (const appt of nextQueueAppointment) {
                if (appt.status === APPOINTMENT_STATUS.SKIPPED) {
                    startable.push(appt);
                    continue;
                }
                if (appt.status === APPOINTMENT_STATUS.CONFIRMED) {
                    if (!isSeenConfirmed) {
                        startable.push(appt);
                        isSeenConfirmed = true;
                    }
                    else {
                        break;
                    }
                }
            }
            // validating if the order is correct
            if (!startable.find((appt) => appt.id == appointment.id)) {
                throw new ConflictError("Previous queue consultation not completed");
            }
            // if (fakeDate < appointment.startTime) {
            //   throw new ConflictError("Appointment can't start before given time");
            // }
            const CONSULTATION_ID = this._idGenerator.generate(process.env.CONSULT_PREFIX);
            const consultation = Consultation.create({
                id: CONSULTATION_ID,
                doctorId,
                patientId: appointment.patientId,
                appointmentId,
                startedAt: new Date(),
                consultationType: appointment.consultationType,
            });
            appointment.startConsultation();
            await Promise.all([
                consultationRepo.create(consultation),
                appointmentRepo.update(appointment),
            ]);
            if (appointment.consultationType === CONSULTATION_TYPE.ONLINE) {
                // this._realTime.emitToRoom(
                //   `appointment-${appointment.id}`,
                //   "consultation-started",
                //   { appointmentId: appointment.id }
                // );
            }
            return { consultationId: consultation.id };
        });
    }
}
//# sourceMappingURL=DoctorStartConsultationUseCase.js.map