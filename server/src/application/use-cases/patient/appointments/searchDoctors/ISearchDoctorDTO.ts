import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";

export interface ISearchDoctorsDTO {
  doctorId: string;
  name: string;
  specialization: string | null;

  experienceYears: number | null;

  fees: {
    online: number | null;
    clinic: number | null;
  };
  profilePic: string | null;
  consultationType: CONSULTATION_TYPE;
  location: string | null;

  nextAvailableSlot: Date;
}
