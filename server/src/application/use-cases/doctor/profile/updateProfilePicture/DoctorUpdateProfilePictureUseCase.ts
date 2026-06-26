import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IFileUpload } from "@application/ports/services/IFileUpload.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IDoctorUpdateProfilePictureUseCase } from "@application/ports/use-cases/doctor/profile/IUpdateProfilePictureUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";

export class DoctorUpdateProfilePictureUseCase implements IDoctorUpdateProfilePictureUseCase{
  constructor(
    private readonly _logger : ILogger,
    private readonly _doctorRepo : IDoctorRepository,
    private readonly _fileUpload : IFileUpload,
  ){}
  async execute(doctorId: string, document: { buffer: Buffer; mimetype: string; originalname: string; }): Promise<void> {
    this._logger.info("Doctor Update Profile Pic", {doctorId})

    const doctor = await this._doctorRepo.findById(doctorId)
    if(!doctor){
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND)
    }

    const documentKey = await this._fileUpload.upload(document)

    doctor.updateProfilePic(documentKey)

    await this._doctorRepo.update(doctor)
  }
}