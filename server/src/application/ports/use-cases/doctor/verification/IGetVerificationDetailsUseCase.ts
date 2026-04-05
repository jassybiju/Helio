import type { IGetVerificationDetailsResponseDTO } from "@application/dto/doctor/verification/IGetVerificationDetailsDTO.ts";

export interface IGetVerificationDetailsUseCase {
  execute(userId: string): Promise<IGetVerificationDetailsResponseDTO>;
}
