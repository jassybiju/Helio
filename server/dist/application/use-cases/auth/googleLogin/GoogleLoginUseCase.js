import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { Doctor } from "#domain/entities/Doctor.js";
import { Patient } from "#domain/entities/Patient.js";
import { Wallet } from "#domain/entities/Wallet.js";
import { Email } from "#domain/value-objects/Email.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class GoogleLoginUseCase {
    _logger;
    _googleAuthService;
    _patientRepo;
    _doctorRepo;
    _idGenerator;
    _accessTokenService;
    _refreshTokenService;
    _sessionRepo;
    _walletRepo;
    constructor(_logger, _googleAuthService, _patientRepo, _doctorRepo, _idGenerator, _accessTokenService, _refreshTokenService, _sessionRepo, _walletRepo) {
        this._logger = _logger;
        this._googleAuthService = _googleAuthService;
        this._patientRepo = _patientRepo;
        this._doctorRepo = _doctorRepo;
        this._idGenerator = _idGenerator;
        this._accessTokenService = _accessTokenService;
        this._refreshTokenService = _refreshTokenService;
        this._sessionRepo = _sessionRepo;
        this._walletRepo = _walletRepo;
    }
    async execute({ credentials, role, }) {
        this._logger.info("Google Auth Attempt");
        // verifiying google Credeintails and getting data
        const googleUser = await this._googleAuthService.verifyCredentials(credentials);
        // intializing user and isProfileCOmplete
        let user = null;
        let isProfileComplete = true;
        let wallet = null;
        const WALLET_PREFIX = process.env.WALLET_PREFIX;
        let walletId = this._idGenerator.generate(WALLET_PREFIX);
        // if role === DOCTOR
        if (role === USER_ROLES.DOCTOR) {
            let isNew = false;
            // checks it doctor already exists
            let existingDoctor = await this._doctorRepo.findByEmail(new Email(googleUser.email));
            // if have unverified doctor
            if (existingDoctor && !existingDoctor.isVerified) {
                existingDoctor = Doctor.googleCreate({
                    id: existingDoctor.id,
                    email: new Email(googleUser.email),
                    fullName: googleUser.name,
                    googleId: googleUser.googleId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
            // if no doctor create one
            if (!existingDoctor) {
                existingDoctor = Doctor.googleCreate({
                    id: this._idGenerator.generate(process.env.DOCTOR_PREFIX),
                    email: new Email(googleUser.email),
                    fullName: googleUser.name,
                    googleId: googleUser.googleId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                isNew = true;
                wallet = Wallet.create({
                    id: walletId,
                    userId: existingDoctor.id,
                    userRole: USER_ROLES.DOCTOR,
                });
            }
            if (existingDoctor.isBlocked) {
                throw new AppError(MESSAGE.USER_BLOCKED, HTTPStatus.FORBIDDEN);
            }
            // if doctor is not linked with googleId link it
            if (!existingDoctor.hasGoogleId) {
                existingDoctor.linkGoogleId(googleUser.googleId);
            }
            // saving the doctor
            if (isNew) {
                await this._doctorRepo.create(existingDoctor);
            }
            else {
                await this._doctorRepo.update(existingDoctor);
            }
            isProfileComplete = existingDoctor.isProfileComplete();
            user = existingDoctor;
        }
        // if role === PATIENT
        if (role === USER_ROLES.PATIENT) {
            let isNew = false;
            let existingPatient = await this._patientRepo.findByEmail(new Email(googleUser.email));
            //if has unverified patient
            if (existingPatient && !existingPatient.isVerified) {
                existingPatient = Patient.googleCreate({
                    id: existingPatient.id,
                    email: new Email(googleUser.email),
                    firstName: googleUser.name,
                    googleId: googleUser.googleId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
            if (!existingPatient) {
                existingPatient = Patient.googleCreate({
                    id: this._idGenerator.generate(process.env.PATIENT_PREFIX),
                    email: new Email(googleUser.email),
                    firstName: googleUser.name,
                    googleId: googleUser.googleId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                isNew = true;
                wallet = Wallet.create({
                    id: walletId,
                    userId: existingPatient.id,
                    userRole: USER_ROLES.PATIENT,
                });
            }
            if (existingPatient.isBlocked) {
                throw new AppError(MESSAGE.USER_BLOCKED, HTTPStatus.FORBIDDEN);
            }
            if (!existingPatient.hasGoogleId) {
                existingPatient.linkGoogleId(googleUser.googleId);
            }
            if (isNew) {
                await this._patientRepo.create(existingPatient);
            }
            else {
                await this._patientRepo.update(existingPatient);
            }
            isProfileComplete = existingPatient.isProfileComplete();
            user = existingPatient;
        }
        if (!user) {
            throw new AppError("User not initialized", HTTPStatus.INTERNAL_ERROR);
        }
        const accessToken = this._accessTokenService.generateAccessToken(user.id, user.email, role);
        const refreshToken = this._refreshTokenService.generateRefreshToken();
        if (wallet) {
            await this._walletRepo.create(wallet);
        }
        await this._sessionRepo.storeRefreshToken(user.id, role, user.email, this._refreshTokenService.hash(refreshToken));
        return {
            accessToken,
            refreshToken,
            user: {
                email: user.email,
                role: role,
                id: user.id,
                isProfileComplete,
            },
        };
    }
}
//# sourceMappingURL=GoogleLoginUseCase.js.map