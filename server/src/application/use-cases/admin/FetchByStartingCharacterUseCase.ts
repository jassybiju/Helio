import type {
  IFetchByStartingCharacterRequestDTO,
  IFetchByStartingCharacterResponseDTO,
} from "@application/dto/admin/IFetchByCharacter.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { IFetchByStartingCharacterUseCase } from "@application/ports/use-cases/admin/IFetchByStartingCharacterUseCase.ts";

export class FetchByStartingCharacterUseCase implements IFetchByStartingCharacterUseCase {
  constructor(private readonly _patientRepo: IPatientRepository) {}
  async execute(
    input: IFetchByStartingCharacterRequestDTO
  ): Promise<IFetchByStartingCharacterResponseDTO> {
    const { char } = input;

    // fetch from db
    const patients = await this._patientRepo.findByChar(char);

    // response
    return {
      data: patients.map((patients) => ({
        _id: patients.id,
        first_name: patients.firstName,
        last_name: patients.lastName,
      })),
    };
  }
}
