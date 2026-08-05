import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class DoctorGetMeHandler {
    _doctorRepo;
    _fileUpload;
    constructor(_doctorRepo, _fileUpload) {
        this._doctorRepo = _doctorRepo;
        this._fileUpload = _fileUpload;
    }
    supports(role) {
        return role === USER_ROLES.DOCTOR;
    }
    async execute(id) {
        const doctor = await this._doctorRepo.findById(id);
        if (!doctor) {
            throw new AppError("No Valid Credientals", HTTPStatus.UNAUTHORIZED);
        }
        if (doctor.isBlocked) {
            throw new AppError("User is Blocked", HTTPStatus.FORBIDDEN);
        }
        const profilePic = doctor.profilePicKey
            ? this._fileUpload.getFileUrl(doctor.profilePicKey)
            : null;
        return {
            id: doctor.id,
            email: doctor.email,
            role: USER_ROLES.DOCTOR,
            status: doctor.verificationStatus,
            isProfileComplete: doctor.isProfileComplete(),
            profilePic,
        };
    }
}
//# sourceMappingURL=DoctorGetMeHandler.js.map