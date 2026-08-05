import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class PatientGetMeHandler {
    _patientRepo;
    _fileUpload;
    constructor(_patientRepo, _fileUpload) {
        this._patientRepo = _patientRepo;
        this._fileUpload = _fileUpload;
    }
    supports(role) {
        return role === USER_ROLES.PATIENT;
    }
    async execute(id) {
        const patient = await this._patientRepo.findById(id);
        if (!patient) {
            throw new AppError("No Valid Credientals", HTTPStatus.UNAUTHORIZED);
        }
        if (patient.isBlocked) {
            throw new AppError("User is Blocked", HTTPStatus.FORBIDDEN);
        }
        const profilePic = patient.profilePicKey
            ? this._fileUpload.getFileUrl(patient.profilePicKey)
            : null;
        return {
            id: patient.id,
            email: patient.email,
            role: USER_ROLES.PATIENT,
            isProfileComplete: patient.isProfileComplete(),
            profilePic,
        };
    }
}
//# sourceMappingURL=PatientGetMeHandler.js.map