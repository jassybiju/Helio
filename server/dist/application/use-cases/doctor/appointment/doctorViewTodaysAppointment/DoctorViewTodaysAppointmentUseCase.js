import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { istToUtc, utcToIst } from "#shared/utils/date.utils.js";
import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
export class DoctorViewTodaysAppointmentUseCase {
    _logger;
    _doctorRepo;
    _patientRepo;
    _appointmentRepo;
    _fileUpload;
    constructor(_logger, _doctorRepo, _patientRepo, _appointmentRepo, _fileUpload) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._patientRepo = _patientRepo;
        this._appointmentRepo = _appointmentRepo;
        this._fileUpload = _fileUpload;
    }
    async execute(doctorId) {
        this._logger.info("Doctor View TOdays Appointmetn UseCase", { doctorId });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const now = new Date();
        const fakeStartDateIST = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        fakeStartDateIST.setDate(fakeStartDateIST.getDate() + 1);
        fakeStartDateIST.setHours(0, 0, 0, 0);
        const endDateIST = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
        endDateIST.setDate(endDateIST.getDate() + 1);
        endDateIST.setHours(23, 59, 59, 999);
        const appointments = await this._appointmentRepo.findDoctorAppointmentForRange(doctor.id, istToUtc(fakeStartDateIST), istToUtc(endDateIST));
        this._logger.debug("APPointmetns", appointments);
        const patientIds = [
            ...new Set(appointments.map((appointment) => appointment.patientId)),
        ];
        const patients = await this._patientRepo.findByIds(patientIds);
        const patientMap = new Map(patients.map((patient) => [patient.id, patient]));
        const toDto = (appointment, i) => {
            const patient = patientMap.get(appointment.patientId);
            if (!patient)
                return null;
            return {
                id: appointment.id,
                patient: {
                    id: patient.id,
                    name: patient.fullName,
                    profilePicture: null,
                    age: patient.age,
                    gender: patient.gender,
                },
                queue: i,
                type: appointment.consultationType,
                status: appointment.status,
                time: appointment.startTime,
            };
        };
        const allDTOs = appointments.map(toDto).filter((x) => x !== null);
        return {
            stats: {
                completed: appointments.filter((appointment) => appointment.status === APPOINTMENT_STATUS.COMPLETED).length,
                skipped: appointments.filter((appointment) => appointment.status === APPOINTMENT_STATUS.SKIPPED).length,
                total: appointments.length,
                upcoming: appointments.filter((appointment) => [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.SKIPPED].includes(appointment.status)).length,
            },
            skipped: allDTOs.filter((appointment) => appointment.status === APPOINTMENT_STATUS.SKIPPED),
            ongoing: allDTOs.filter((appointment) => appointment.status === APPOINTMENT_STATUS.ONGOING),
            upcoming: allDTOs.filter((appointment) => [APPOINTMENT_STATUS.CONFIRMED].includes(appointment.status))[0],
        };
    }
}
//# sourceMappingURL=DoctorViewTodaysAppointmentUseCase.js.map