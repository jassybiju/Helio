import { OTP } from "#domain/entities/OTP.js";
import { Patient } from "#domain/entities/Patient.js";
import { Email } from "#domain/value-objects/Email.js";
export class RegisterPatientUseCase {
    _patientValidator;
    _patientRepo;
    _passwordService;
    _idGenerator;
    _logger;
    _otpService;
    _otpRepo;
    _emailService;
    constructor(_patientValidator, _patientRepo, _passwordService, _idGenerator, _logger, _otpService, _otpRepo, _emailService) {
        this._patientValidator = _patientValidator;
        this._patientRepo = _patientRepo;
        this._passwordService = _passwordService;
        this._idGenerator = _idGenerator;
        this._logger = _logger;
        this._otpService = _otpService;
        this._otpRepo = _otpRepo;
        this._emailService = _emailService;
    }
    async execute(input) {
        const { first_name, last_name, dob, email, gender, password, phone } = input;
        this._logger.info("Registering User");
        // ensuring there is no verified user with the email
        const existingPatient = await this._patientValidator.ensureEmailAvailable(email);
        const isNew = !existingPatient;
        // creating new patient ( if unverified patient exists keep the id to prevent duplicating email in db )
        const patient = new Patient(existingPatient ? existingPatient.id : this._idGenerator.generate("USR"), new Email(email), await this._passwordService.hash(password), first_name, last_name, gender, new Date(dob), null, null, phone, false, false, [], [], null, new Date(), new Date());
        if (isNew) {
            await this._patientRepo.create(patient);
        }
        else {
            await this._patientRepo.update(patient);
        }
        // generate otp
        let otp = OTP.create({
            id: this._idGenerator.generate("OTP"),
            purpose: "REGISTER",
            email: new Email(email),
            otp: this._otpService.generate(),
            context: "patient",
        });
        await this._otpRepo.save(otp);
        await this._emailService.sendEmail({
            to: email,
            subject: "Your OTP For the helixo",
            body: `Your OTP is ${otp.code}`,
        });
        return {
            otp_invalid_at: String(otp.invalidAt.getTime()),
            email,
            id: otp.id,
        };
    }
}
//# sourceMappingURL=RegisterPatientUseCase.js.map