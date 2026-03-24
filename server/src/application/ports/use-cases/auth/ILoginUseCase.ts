import type {
  ILoginRequestDTO,
  ILoginResponseDTO,
} from "@application/dto/auth/ILoginDTO.ts";

export interface ILoginUseCase {
  execute(input: ILoginRequestDTO): Promise<ILoginResponseDTO>;
}
