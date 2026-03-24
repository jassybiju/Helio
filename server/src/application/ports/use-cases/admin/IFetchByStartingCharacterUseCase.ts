import type {
  IFetchByStartingCharacterRequestDTO,
  IFetchByStartingCharacterResponseDTO,
} from "@application/dto/admin/IFetchByCharacter.ts";

export interface IFetchByStartingCharacterUseCase {
  execute(
    input: IFetchByStartingCharacterRequestDTO
  ): Promise<IFetchByStartingCharacterResponseDTO>;
}
