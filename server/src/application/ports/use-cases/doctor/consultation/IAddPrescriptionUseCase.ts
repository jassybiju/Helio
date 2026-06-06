import type { FOOD_TIMING } from "@domain/common/enums/consultation.enum.ts";

export interface IAddPrescriptionUseCase {
  execute(
    doctorId: string,
    consultationId: string,
    data: {
      name: string;
      foodTiming: FOOD_TIMING;
      timings: { morning: boolean; afternoon: boolean; night: boolean };
      durationInDays: number;
      instruction: string;
    }
  ): Promise<void>;
}
