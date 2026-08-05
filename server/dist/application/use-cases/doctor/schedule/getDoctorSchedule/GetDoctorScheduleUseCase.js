export class GetDoctorScheduleUseCase {
    _logger;
    _doctorShiftRepo;
    constructor(_logger, _doctorShiftRepo) {
        this._logger = _logger;
        this._doctorShiftRepo = _doctorShiftRepo;
    }
    async execute(doctorId) {
        this._logger.info("Get Doctor Schedule Attempt", { doctorId });
        const shifts = this._doctorShiftRepo.findByDoctor(doctorId);
        return shifts;
    }
}
//# sourceMappingURL=GetDoctorScheduleUseCase.js.map