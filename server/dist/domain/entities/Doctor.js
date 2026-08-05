import { DOCTOR_VERIFICATION_STATUS } from "#domain/common/enums/doctor.enum.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class Doctor {
    _id;
    _email;
    _passwordHash;
    _fullName;
    _gender;
    _profilePicKey;
    _specialization;
    _careerStartYear;
    _bio;
    _verificationStatus;
    _documentKey;
    _rejectionReason;
    _additionalInfo;
    _onlineFee;
    _clinicFee;
    _googleId;
    _isVerified;
    _isBlocked;
    _createdAt;
    _updatedAt;
    _verificationHistory;
    _isDeleted;
    constructor(_id, _email, _passwordHash, _fullName, _gender, _profilePicKey, _specialization, _careerStartYear, _bio, _verificationStatus, _documentKey, _rejectionReason, _additionalInfo, _onlineFee, _clinicFee, _googleId, _isVerified, _isBlocked, _createdAt, _updatedAt, _verificationHistory = [], _isDeleted = false) {
        this._id = _id;
        this._email = _email;
        this._passwordHash = _passwordHash;
        this._fullName = _fullName;
        this._gender = _gender;
        this._profilePicKey = _profilePicKey;
        this._specialization = _specialization;
        this._careerStartYear = _careerStartYear;
        this._bio = _bio;
        this._verificationStatus = _verificationStatus;
        this._documentKey = _documentKey;
        this._rejectionReason = _rejectionReason;
        this._additionalInfo = _additionalInfo;
        this._onlineFee = _onlineFee;
        this._clinicFee = _clinicFee;
        this._googleId = _googleId;
        this._isVerified = _isVerified;
        this._isBlocked = _isBlocked;
        this._createdAt = _createdAt;
        this._updatedAt = _updatedAt;
        this._verificationHistory = _verificationHistory;
        this._isDeleted = _isDeleted;
        if (this._careerStartYear &&
            (this._careerStartYear <= 1900 ||
                this._careerStartYear > new Date().getFullYear())) {
            throw new AppError("Invalid Career Start Year", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
    }
    updateProfilePic(profilePicKey) {
        this._profilePicKey = profilePicKey;
    }
    static _validTransistions = {
        [DOCTOR_VERIFICATION_STATUS.PENDING]: [
            DOCTOR_VERIFICATION_STATUS.APPROVED,
            DOCTOR_VERIFICATION_STATUS.REJECTED,
        ],
        [DOCTOR_VERIFICATION_STATUS.REJECTED]: [DOCTOR_VERIFICATION_STATUS.PENDING],
        [DOCTOR_VERIFICATION_STATUS.APPROVED]: [],
    };
    static isValidTransistion(current, next) {
        return this._validTransistions[current].includes(next);
    }
    resubmit(documentKey, additionalInfo) {
        this._verificationStatus = DOCTOR_VERIFICATION_STATUS.PENDING;
        this._rejectionReason = null;
        this._documentKey = documentKey;
        this._additionalInfo = additionalInfo;
        this._verificationHistory.push({
            status: DOCTOR_VERIFICATION_STATUS.PENDING,
            reason: null,
            documentKey: documentKey,
            actedAt: new Date(),
        });
    }
    approve() {
        this._verificationStatus = DOCTOR_VERIFICATION_STATUS.APPROVED;
        this._rejectionReason = null;
        this._verificationHistory.push({
            status: DOCTOR_VERIFICATION_STATUS.APPROVED,
            reason: null,
            documentKey: null,
            actedAt: new Date(),
        });
    }
    reject(reason) {
        this._verificationStatus = DOCTOR_VERIFICATION_STATUS.REJECTED;
        this._rejectionReason = reason;
        this._verificationHistory.push({
            status: DOCTOR_VERIFICATION_STATUS.REJECTED,
            reason,
            documentKey: null,
            actedAt: new Date(),
        });
    }
    updateFee({ clinicFee, onlineFee, }) {
        if (clinicFee) {
            this._clinicFee = clinicFee;
        }
        if (onlineFee) {
            this._onlineFee = onlineFee;
        }
    }
    updateProfile(data) {
        this._fullName = data.fullName;
        this._specialization = data.specialization;
        this._bio = data.bio;
    }
    canAccessPlatform() {
        return (this._isVerified &&
            !this._isBlocked &&
            this._verificationStatus === DOCTOR_VERIFICATION_STATUS.APPROVED);
    }
    isProfileComplete() {
        return !!(this._fullName &&
            this._gender &&
            this._specialization &&
            this._careerStartYear &&
            this._documentKey &&
            this._isVerified);
    }
    toogleBlockStatus() {
        this._isBlocked = !this._isBlocked;
    }
    linkGoogleId(googleId) {
        this._googleId = googleId;
    }
    verifyDoctor() {
        this._isVerified = true;
    }
    updatePassword(passwordHash) {
        this._passwordHash = passwordHash;
    }
    static create({ id, email, passwordHash, gender, full_name, specialization, career_start_year, documentKey, createdAt, updatedAt, }) {
        return new Doctor(id, email, passwordHash, full_name, gender, null, specialization, career_start_year, null, DOCTOR_VERIFICATION_STATUS.PENDING, documentKey, null, null, null, null, null, false, false, createdAt, updatedAt, [
            {
                status: DOCTOR_VERIFICATION_STATUS.PENDING,
                reason: "",
                documentKey: documentKey,
                actedAt: new Date(),
            },
        ]);
    }
    static googleCreate({ id, email, fullName, googleId, createdAt, updatedAt, }) {
        return new Doctor(id, email, null, fullName, null, null, null, null, null, DOCTOR_VERIFICATION_STATUS.PENDING, null, null, null, null, null, googleId, true, false, createdAt, updatedAt);
    }
    completeProfile({ gender, specialization, careerStartYear, documentKey, }) {
        if (this._careerStartYear &&
            (this._careerStartYear <= 1900 ||
                this._careerStartYear > new Date().getFullYear())) {
            throw new AppError("Invalid Career Start Year", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
        this._gender = gender;
        this._specialization = specialization;
        this._careerStartYear = careerStartYear;
        this._documentKey = documentKey;
        this._verificationHistory = [
            {
                status: DOCTOR_VERIFICATION_STATUS.PENDING,
                reason: "",
                documentKey: documentKey,
                actedAt: new Date(),
            },
        ];
    }
    get profilePicKey() {
        return this._profilePicKey;
    }
    get yearsOfExperience() {
        if (this._careerStartYear) {
            return new Date().getFullYear() - this._careerStartYear;
        }
        return null;
    }
    get verificationHistory() {
        return this._verificationHistory;
    }
    get hasGoogleId() {
        return !!this._googleId;
    }
    get isVerified() {
        return this._isVerified;
    }
    get id() {
        return this._id;
    }
    get email() {
        return this._email.value;
    }
    get passwordHash() {
        return this._passwordHash;
    }
    get fullName() {
        return this._fullName;
    }
    get gender() {
        return this._gender;
    }
    get specialization() {
        return this._specialization;
    }
    get careerStartYear() {
        return this._careerStartYear;
    }
    get bio() {
        return this._bio;
    }
    get verificationStatus() {
        return this._verificationStatus;
    }
    get documentKey() {
        return this._documentKey;
    }
    get rejectionReason() {
        return this._rejectionReason;
    }
    get additionalInfo() {
        return this._additionalInfo;
    }
    get onlineFee() {
        return this._onlineFee;
    }
    get clinicFee() {
        return this._clinicFee;
    }
    get isBlocked() {
        return this._isBlocked;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    get isDeleted() {
        return this._isDeleted;
    }
}
//# sourceMappingURL=Doctor.js.map