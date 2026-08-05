import type {
  IFetchByStartingCharacterRequestDTO,
  IFetchByStartingCharacterResponseDTO,
} from "#application/dto/admin/IFetchByCharacter.js";

export interface IFetchByStartingCharacterUseCase {
  execute(
    input: IFetchByStartingCharacterRequestDTO
  ): Promise<IFetchByStartingCharacterResponseDTO>;
}
