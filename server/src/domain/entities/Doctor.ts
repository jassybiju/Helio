import type { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";
import type { Email } from "@domain/value-objects/Email.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class Doctor {
  constructor(
    private readonly _id : string,
    private readonly _email : Email,
    private readonly __passwordHash : string,
    
    private readonly _fullName : string,
    private readonly _gender: GENDER,

    private readonly _specialization: string,
    private readonly _careerStartYear: number,
    private readonly _bio: string | null,

    private readonly _verificationStatus : DOCTOR_VERIFICATION_STATUS,
    private readonly _documentKey : string | null,
    private readonly _rejectionReason : string | null,

    private readonly _onlineFee : number | null,
    private readonly _clinicFee : number | null,

    private readonly _isVerifed : boolean,
    private readonly _isBlocked : boolean,

    private readonly _createdAt : Date,
    private readonly _updatedAt : Date
  ){
    if(this._careerStartYear <= 1900 || this._careerStartYear > new Date().getFullYear()){
      throw new AppError("Invalid Career Start Year", HTTPStatus.UNPROCESSBLE_ENTITY)
    }

  }
}