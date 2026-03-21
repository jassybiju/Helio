import type {
  IVerifyOtpRequestDTO,
  IVerifyOTPResponseDTO,
} from "@application/dto/auth/IOTPDTO.ts";

export interface IVerifyOTPUseCase {
  execute(input: IVerifyOtpRequestDTO): Promise<IVerifyOTPResponseDTO>;
}
