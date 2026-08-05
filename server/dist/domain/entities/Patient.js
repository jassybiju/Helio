import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class Patient {
    _id;
    _email;
    _passwordHash;
    _firstName;
    _lastName;
    _gender;
    _dob;
    _bloodGroup;
    _proficPicKey;
    _phone;
    _isVerified;
    _isBlocked;
    _allergens;
    _conditions;
    _googleId;
    _createdAt;
    _updatedAt;
    _isDeleted;
    constructor(_id, _email, _passwordHash, _firstName, _lastName, _gender, _dob, _bloodGroup, _proficPicKey, _phone, _isVerified, _isBlocked, _allergens, _conditions, _googleId, _createdAt, _updatedAt, _isDeleted = false) {
        this._id = _id;
        this._email = _email;
        this._passwordHash = _passwordHash;
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._gender = _gender;
        this._dob = _dob;
        this._bloodGroup = _bloodGroup;
        this._proficPicKey = _proficPicKey;
        this._phone = _phone;
        this._isVerified = _isVerified;
        this._isBlocked = _isBlocked;
        this._allergens = _allergens;
        this._conditions = _conditions;
        this._googleId = _googleId;
        this._createdAt = _createdAt;
        this._updatedAt = _updatedAt;
        this._isDeleted = _isDeleted;
        if (this._phone && this._phone.length < 9) {
            throw new AppError("Invalid Phone NUmber", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
    }
    verifyPatient() {
        this._isVerified = true;
    }
    addAllergen({ allergen, _id, severity, }) {
        if (this._allergens.some((a) => a.name === allergen)) {
            throw new AppError("Allergen Already exists", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
        this._allergens.push({
            name: allergen,
            _id,
            severity,
            createdAt: new Date(),
        });
    }
    updateProfile(data) {
        if (data.phone.length < 9) {
            throw new AppError("Invalid Phone Number", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
        this._firstName = data.firstName;
        this._lastName = data.lastName;
        this._gender = data.gender;
        this._dob = new Date(data.dob);
        this._bloodGroup = data.bloodGroup;
        this._phone = data.phone;
    }
    removeAllergen(allergenId) {
        this._allergens = this._allergens.filter((a) => a._id !== allergenId);
    }
    addCondition({ _id, condition }) {
        if (this._conditions.some((a) => a.name === condition)) {
            throw new AppError("Condition Already exists", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
        this._conditions.push({ _id, name: condition, createdAt: new Date() });
    }
    removeCondition(conditionId) {
        this._conditions = this._conditions.filter((c) => c._id !== conditionId);
    }
    updatePassword(passwordHash) {
        this._passwordHash = passwordHash;
    }
    completeProfile({ gender, dob, phone, }) {
        if (this._phone && this._phone.length < 9) {
            throw new AppError("Invalid Phone NUmber", HTTPStatus.UNPROCESSBLE_ENTITY);
        }
        this._gender = gender;
        this._phone = phone;
        this._dob = dob;
    }
    toogleBlockStatus() {
        this._isBlocked = !this._isBlocked;
    }
    isProfileComplete() {
        return !!(this._firstName && this._gender && this._dob && this._phone);
    }
    linkGoogleId(googleId) {
        this._googleId = googleId;
    }
    updateProfilePic(key) {
        this._proficPicKey = key;
    }
    get age() {
        if (!this._dob)
            return null;
        const today = new Date();
        const birthDate = this._dob;
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        // Adjust if birthday hasn't happened yet this year
        if (monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    get hasGoogleId() {
        return !!this._googleId;
    }
    get googleId() {
        return this._googleId;
    }
    get id() {
        return this._id;
    }
    get phone() {
        return this._phone;
    }
    get email() {
        return this._email.value;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get fullName() {
        return this._firstName + " " + (this.lastName ?? "");
    }
    get gender() {
        return this._gender;
    }
    get isDeleted() {
        return this._isDeleted;
    }
    get bloodGroup() {
        return this._bloodGroup;
    }
    get dob() {
        return this._dob;
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
    get isVerified() {
        return this._isVerified;
    }
    get passwordHashed() {
        return this._passwordHash;
    }
    get allergens() {
        return this._allergens;
    }
    get conditions() {
        return this._conditions;
    }
    get profilePicKey() {
        return this._proficPicKey;
    }
    // ERROR
    static googleCreate({ id, firstName, googleId, createdAt, updatedAt, email, }) {
        return new Patient(id, email, null, firstName, null, null, null, null, null, null, true, false, [], [], googleId, createdAt, updatedAt);
    }
}
//# sourceMappingURL=Patient.js.map