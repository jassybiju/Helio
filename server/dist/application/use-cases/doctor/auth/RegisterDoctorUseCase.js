import { Doctor } from "#domain/entities/Doctor.js";
import { OTP } from "#domain/entities/OTP.js";
import { Email } from "#domain/value-objects/Email.js";
export class RegisterDoctorUseCase {
    _logger;
    _doctorValidator;
    _idGenerator;
    _passwordService;
    _fileUpload;
    _doctorRepo;
    _otpRepo;
    _otpService;
    _emailService;
    constructor(_logger, _doctorValidator, _idGenerator, _passwordService, _fileUpload, _doctorRepo, _otpRepo, _otpService, _emailService) {
        this._logger = _logger;
        this._doctorValidator = _doctorValidator;
        this._idGenerator = _idGenerator;
        this._passwordService = _passwordService;
        this._fileUpload = _fileUpload;
        this._doctorRepo = _doctorRepo;
        this._otpRepo = _otpRepo;
        this._otpService = _otpService;
        this._emailService = _emailService;
    }
    async execute(input) {
        this._logger.info("Doctor Registration Starteds");
        const { email, full_name, specialization, career_start_year, gender, password, document, } = input;
        // checking if doctor already exists with isVerified true
        const existingDoctor = await this._doctorValidator.ensureEmailAvailable(email);
        const isNew = !existingDoctor;
        // saving documnets to bucket
        const documentKey = await this._fileUpload.upload(document, true);
        // creating new doctor ( if unverified doctor exists keep the id and changes data )
        const doctor = Doctor.create({
            id: existingDoctor
                ? existingDoctor.id
                : this._idGenerator.generate(process.env.DOCTOR_PREFIX || "DOC"),
            passwordHash: await this._passwordService.hash(password),
            email: new Email(email),
            gender: gender,
            full_name,
            specialization,
            career_start_year,
            documentKey,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // saving doctor
        if (isNew) {
            await this._doctorRepo.create(doctor);
            this._logger.debug("Doctor Created");
        }
        else {
            await this._doctorRepo.update(doctor);
            this._logger.debug("Doctor Updated");
        }
        // generating otp
        let otp = OTP.create({
            id: this._idGenerator.generate(process.env.OTP_PREFIX || "OTP"),
            purpose: "REGISTER",
            otp: this._otpService.generate(),
            email: new Email(email),
            context: "doctor",
        });
        // saving otp
        await this._otpRepo.save(otp);
        this._logger.debug("OTP Saved");
        // sending otp
        await this._emailService.sendEmail({
            to: email,
            subject: "Your OTP For the helixo",
            body: `Your OTP is ${otp.code}`,
        });
        return {
            status: "pending",
            otp_invalid_at: String(otp.invalidAt.getTime()),
            id: otp.id,
            email: otp.email.value,
        };
    }
}
//# sourceMappingURL=RegisterDoctorUseCase.js.map