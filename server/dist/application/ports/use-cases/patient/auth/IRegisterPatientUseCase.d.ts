import type { IRegisterPatientRequestDTO, IRegisterPatientResponseDTO } from "#application/dto/patient/auth/IRegisterPatientDTO.js";
export interface IRegisterPatientUseCase {
    execute(input: IRegisterPatientRequestDTO): Promise<IRegisterPatientResponseDTO>;
}
//# sourceMappingURL=IRegisterPatientUseCase.d.ts.map