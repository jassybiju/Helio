import type { ILogoutRequestDTO } from "#application/use-cases/auth/logout/ILogoutDto.js";

export interface ILogoutUseCase {
  execute(input: ILogoutRequestDTO): Promise<void>;
}
