import type { BLOOD_GROUP } from "@domain/common/enums/blood-group.enum.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";

export interface IUpdatePatientInput {
  patientId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  phone: string;
}

export interface IUpdatePatientProfileUseCase {
  execute(input: IUpdatePatientInput): Promise<void>;
}
