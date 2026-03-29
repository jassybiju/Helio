import type {
  IGetMeRequestDTO,
  IGetMeResponseDTO,
} from "@application/dto/auth/IGetMeDTO.ts";

export interface IGetMeUseCase {
  execute(input: IGetMeRequestDTO): Promise<IGetMeResponseDTO>;
}
