import type { IGetVerificationDetailsResponseDTO } from "#application/use-cases/doctor/verification/getVerificationDetails/IGetVerificationDetailsDTO.js";

export interface IGetVerificationDetailsUseCase {
  execute(userId: string): Promise<IGetVerificationDetailsResponseDTO>;
}
