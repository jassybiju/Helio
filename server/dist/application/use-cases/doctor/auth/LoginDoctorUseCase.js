import { DoctorValidator } from "#application/validators/DoctorValidator.js";
import { Email } from "#domain/value-objects/Email.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class LoginDoctorUseCase {
    _loggerService;
    _doctorRepo;
    _doctorValidator;
    _accessTokenService;
    _refreshTokenService;
    _sessionService;
    constructor(_loggerService, _doctorRepo, _doctorValidator, _accessTokenService, _refreshTokenService, _sessionService) {
        this._loggerService = _loggerService;
        this._doctorRepo = _doctorRepo;
        this._doctorValidator = _doctorValidator;
        this._accessTokenService = _accessTokenService;
        this._refreshTokenService = _refreshTokenService;
        this._sessionService = _sessionService;
    }
    async execute(input) {
        const { email, password } = input;
        this._loggerService.info("Doctor Login Attempt", { email });
        // ensure email exists
        const doctor = await this._doctorRepo.findByEmail(new Email(email));
        if (!doctor) {
            throw new AppError("No User Found", HTTPStatus.BAD_REQUEST);
        }
        // check if user is_verifed
        if (!doctor.isVerified) {
            throw new AppError("Doctor Not Verified", HTTPStatus.BAD_REQUEST);
        }
        // check if password same
        await this._doctorValidator.validateDoctorPassword(doctor, password);
        // create token
        const accessToken = this._accessTokenService.generateAccessToken(doctor.id, doctor.email, USER_ROLES.DOCTOR);
        const refreshToken = this._refreshTokenService.generateRefreshToken();
        await this._sessionService.storeRefreshToken(doctor.id, USER_ROLES.DOCTOR, doctor.email, this._refreshTokenService.hash(refreshToken));
        // return obj
        return {
            accessToken,
            refreshToken,
            user: {
                email: doctor.email,
                id: doctor.id,
                role: USER_ROLES.DOCTOR,
            },
        };
    }
}
//# sourceMappingURL=LoginDoctorUseCase.js.map