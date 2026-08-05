import type { IResendOTPRequestDTO, IResendOTPResponseDTO } from "#application/dto/auth/IOTPDTO.js";
export interface IResendOTPUseCase {
    execute(input: IResendOTPRequestDTO): Promise<IResendOTPResponseDTO>;
}
//# sourceMappingURL=IResendOTPUseCase.d.ts.map