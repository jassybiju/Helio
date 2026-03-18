import type {
  IRegisterDoctorReponseDTO,
  IRegisterDoctorRequestDTO,
} from "@application/dto/doctor/auth/IRegisterDoctorDTO.ts";

export interface IRegisterDoctorUseCase {
  execute(input: IRegisterDoctorRequestDTO): Promise<IRegisterDoctorReponseDTO>;
}
