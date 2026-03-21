import type {
  IResendOTPRequestDTO,
  IResendOTPResponseDTO,
} from "@application/dto/auth/IOTPDTO.ts";

export interface IResendOTPUseCase {
  execute(input: IResendOTPRequestDTO): Promise<IResendOTPResponseDTO>;
}
