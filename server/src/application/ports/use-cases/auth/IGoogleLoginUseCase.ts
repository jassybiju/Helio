import type { ILoginResponseDTO } from "@application/dto/auth/ILoginDTO.ts";

export interface IGoogleLoginUseCase {
  execute({
    credentials,
    role,
  }: {
    credentials: string;
    role: string;
  }): Promise<ILoginResponseDTO>;
}
