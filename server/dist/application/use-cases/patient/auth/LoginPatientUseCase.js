import { Email } from "#domain/value-objects/Email.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export class LoginPatientUseCase {
    _logger;
    _patientRepo;
    _patientValidator;
    _accessTokenService;
    _refreshTokenService;
    _sessionRepo;
    constructor(_logger, _patientRepo, _patientValidator, _accessTokenService, _refreshTokenService, _sessionRepo) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._patientValidator = _patientValidator;
        this._accessTokenService = _accessTokenService;
        this._refreshTokenService = _refreshTokenService;
        this._sessionRepo = _sessionRepo;
    }
    async execute(input) {
        const { email, password } = input;
        this._logger.info("Patient Login Attempt", { email, password });
        // fetch patient from db
        const patient = await this._patientRepo.findByEmail(new Email(email));
        // check if patient exists
        if (!patient) {
            throw new AppError("Invalid Email or passwords", HTTPStatus.BAD_REQUEST);
        }
        if (!patient.isVerified) {
            throw new AppError("Invalid Emails or password", HTTPStatus.BAD_REQUEST);
        }
        if (patient.isBlocked) {
            throw new AppError("Patient Blocked contact admin", HTTPStatus.BAD_REQUEST);
        }
        // verify patient password
        await this._patientValidator.validatePatientPassword(patient, password);
        // create refresh and access token
        const accessToken = this._accessTokenService.generateAccessToken(patient.id, patient.email, USER_ROLES.PATIENT);
        const refreshToken = this._refreshTokenService.generateRefreshToken();
        //saving hashed refresh token
        await this._sessionRepo.storeRefreshToken(patient.id, USER_ROLES.PATIENT, patient.email, this._refreshTokenService.hash(refreshToken));
        // return response
        return {
            accessToken,
            refreshToken,
            user: {
                id: patient.id,
                role: USER_ROLES.PATIENT,
                email: patient.email,
            },
        };
    }
}
//# sourceMappingURL=LoginPatientUseCase.js.map