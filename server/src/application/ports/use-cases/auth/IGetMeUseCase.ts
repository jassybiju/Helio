import type {
  IGetMeRequestDTO,
  IGetMeResponseDTO,
} from "#application/dto/auth/IGetMeDTO.js";

export interface IGetMeUseCase {
  execute(input: IGetMeRequestDTO): Promise<IGetMeResponseDTO>;
}
