import type { IGetSlotDTO } from "@application/use-cases/patient/appointments/getSlots/IGetSlotDTO.ts";
import type { Doctor } from "@domain/entities/Doctor.ts";

export interface IGetSlotUseCase {
  execute(
    doctorId: string,
    patientId: string,
    reviewInput: {
      page?: number | undefined;
      limit?: number | undefined;
    }
  ): Promise<{
    slots: IGetSlotDTO;
    doctor: Doctor;
    reviews: {
      id: string;
      patientName: string;
      comments: string;
      ratings: number;
      createdAt: Date;
    }[];
    totalReviews: number[];
  }>;
}
