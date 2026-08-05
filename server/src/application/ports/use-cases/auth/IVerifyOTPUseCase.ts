import type {
  IVerifyOtpRequestDTO,
  IVerifyOTPResponseDTO,
} from "#application/dto/auth/IOTPDTO.js";

export interface IVerifyOTPUseCase {
  execute(input: IVerifyOtpRequestDTO): Promise<IVerifyOTPResponseDTO>;
}
