import type { IGetVerificationDetailsResponseDTO } from "@application/use-cases/doctor/verification/getVerificationDetails/IGetVerificationDetailsDTO.ts";

export interface IGetVerificationDetailsUseCase {
  execute(userId: string): Promise<IGetVerificationDetailsResponseDTO>;
}
