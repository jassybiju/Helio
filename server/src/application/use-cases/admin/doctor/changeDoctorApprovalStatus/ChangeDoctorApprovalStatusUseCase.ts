import type { IChangeDoctorApprovalStatusUseCase } from "@application/ports/use-cases/admin/doctor/IChangeDoctorApprovalStatusUseCase.ts";
import { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";
import type { IChangeDoctorApprovalStatusRequestDTO, IChangeDoctorApprovalStatusResponseDTO } from "./IChangeDoctorApprovalStatusDTO.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { Doctor } from "@domain/entities/Doctor.ts";

export class ChangeDoctorApprovalStatusUseCase implements IChangeDoctorApprovalStatusUseCase {
  constructor(
    private readonly _logger : ILogger,
    private readonly _doctorRepo : IDoctorRepository
  ){}
  async execute(input: IChangeDoctorApprovalStatusRequestDTO, doctorId: string): Promise<IChangeDoctorApprovalStatusResponseDTO> {
    this._logger.info("Doctor Approval Status Change attempt", {verification_status : input.verification_status, doctorId})

    const doctor = await this._doctorRepo.findById(doctorId)

    if(!doctor){
      throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND)
    }

    if(!Doctor.isValidTransistion(doctor.verificationStatus, input.verification_status)){
      throw new AppError("Invalid Approval Status", HTTPStatus.BAD_REQUEST)
    }

    if(input.verification_status === DOCTOR_VERIFICATION_STATUS.APPROVED){
      doctor.approve()
    }
    else if(input.verification_status === DOCTOR_VERIFICATION_STATUS.REJECTED){
      if(!input.rejection_reason){
        throw new AppError("Rejection Reason is required for rejecting", HTTPStatus.BAD_REQUEST)
      }
      doctor.reject(input.rejection_reason)
    }

    await this._doctorRepo.save(doctor)
    
    return {doctorId, verification_status:input.verification_status, rejection_reason : input.rejection_reason}
    
  }
}