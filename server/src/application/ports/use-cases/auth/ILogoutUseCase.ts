import type { ILogoutRequestDTO } from "@application/use-cases/auth/logout/ILogoutDto.ts";

export interface ILogoutUseCase {
  execute(input: ILogoutRequestDTO): Promise<void>;
}
