import type {
  ILoginRequestDTO,
  ILoginResponseDTO,
} from "#application/dto/auth/ILoginDTO.js";

export interface ILoginUseCase {
  execute(input: ILoginRequestDTO): Promise<ILoginResponseDTO>;
}
