import type { ALLERGEN_SEVERITY } from "@domain/common/enums/allergen_severity.ts";

export interface IAddPatientAllergenUseCase {
  execute(
    patientId: string,
    allergen: string,
    severity: ALLERGEN_SEVERITY
  ): Promise<void>;
}
