import type { BLOOD_GROUP } from "@domain/common/enums/blood-group.enum.ts";
import type { FOOD_TIMING } from "@domain/common/enums/consultation.enum.ts";
import type { GENDER } from "@domain/common/enums/gender.enum.ts";

export interface IDoctorViewConsultationDTO {
  patient: {
    id: string;
    name: string;
    age: number | null;
    gender: GENDER | null;
    blood_type: BLOOD_GROUP | null;
    phone: string | null;
    email: string;
    condition: string[];
    allergens: string[];
  };
  previousVitals: {
    bloodPressure: string | null;
    oxygenLevel: number | null;
    heartRate: number | null;
    temperature: number | null;
    weight: number | null;
    height: number | null;
  };
  appointment: {
    id: string;
    startTime: Date;
    endTime: Date;
  };
  currentVitals: {
    bloodPressure: string | null;
    oxygenLevel: number | null;
    heartRate: number | null;
    temperature: number | null;
    weight: number | null;
    height: number | null;
  };
  primaryDiagnosis: string | null;
  clinicalObservation: string | null;
  generalAdvice: string | null;
  quickNote: string | null;
  consultationType: string | null;
  prescriptions: {
    name: string;
    foodTiming: FOOD_TIMING;
    timings: { morning: boolean; afternoon: boolean; night: boolean };
    durationInDays: number;
    instructions: string | null;
  }[];
  labTest: { id: string; testName: string; instructions: string | null }[];

  medicationPeriod: number | null;
}
