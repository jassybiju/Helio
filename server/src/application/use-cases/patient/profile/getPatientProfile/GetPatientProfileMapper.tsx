import type { Patient } from "@domain/entities/Patient.ts";
import type { IGetPatientProfileDTO } from "./IGetPatientProfileDTO.ts";

export class GetPatientProfileMapper {
  static toDto(patient : Patient) : IGetPatientProfileDTO {
    return {
      id : patient.id,
      email : patient.email,
      firstName : patient.firstName,
      lastName : patient.lastName,
      gender : patient.gender,
      dob : patient.dob?.toLocaleDateString() ?? null,
      bloodGroup : patient.bloodGroup,
      phone : patient.phone,
      allergens : patient.allergens,
      conditions : patient.conditions
    }
  }
}