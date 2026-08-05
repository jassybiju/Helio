import type {
  IRegisterDoctorReponseDTO,
  IRegisterDoctorRequestDTO,
} from "#application/dto/doctor/auth/IRegisterDoctorDTO.js";

export interface IRegisterDoctorUseCase {
  execute(input: IRegisterDoctorRequestDTO): Promise<IRegisterDoctorReponseDTO>;
}
