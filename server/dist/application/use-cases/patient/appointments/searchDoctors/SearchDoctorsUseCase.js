export class SearchDoctorsUseCase {
    _logger;
    _shiftRepo;
    _doctorRepo;
    _slotGen;
    _fileUpload;
    constructor(_logger, _shiftRepo, _doctorRepo, _slotGen, _fileUpload) {
        this._logger = _logger;
        this._shiftRepo = _shiftRepo;
        this._doctorRepo = _doctorRepo;
        this._slotGen = _slotGen;
        this._fileUpload = _fileUpload;
    }
    async execute(input) {
        this._logger.info("Search Doctors started", input);
        // get all doctors based on query (name , speciality, doctorFee , experience)
        const { doctors, totalCount } = await this._doctorRepo.search(input);
        if (!doctors.length)
            return { data: [], totalCount: 0 };
        const doctorIds = doctors.map((doc) => doc.id);
        const shifts = await this._shiftRepo.findByDoctorIds(doctorIds);
        const filteredShifts = shifts.filter((shift) => {
            if (input.consultationType &&
                input.consultationType !== shift.consultationType) {
                return false;
            }
            return true;
        });
        let fromDate = input.date;
        if (!fromDate) {
            fromDate = new Date();
        }
        const slots = this._slotGen.generateNextAvailableSlot(filteredShifts, fromDate);
        return {
            data: slots.map((s) => {
                const doctor = doctors.find((doc) => doc.id == s.doctorId);
                return {
                    doctorId: s.doctorId,
                    name: doctor.fullName,
                    specialization: doctor.specialization,
                    experienceYears: doctor.yearsOfExperience,
                    fees: { clinic: doctor?.clinicFee, online: doctor?.onlineFee },
                    consultationType: s.consultationType,
                    location: s.location ?? null,
                    nextAvailableSlot: s.startTime,
                    profilePic: doctor.profilePicKey
                        ? this._fileUpload.getFileUrl(doctor.profilePicKey)
                        : null,
                };
            }),
            totalCount,
        };
    }
}
//# sourceMappingURL=SearchDoctorsUseCase.js.map