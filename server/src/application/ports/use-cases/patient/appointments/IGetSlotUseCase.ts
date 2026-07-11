import type { IGetSlotDTO } from "@application/use-cases/patient/appointments/getSlots/IGetSlotDTO.ts";

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
    doctor: {
      fullName: string;
      speciality: string | null;
      onlineFee: number | null;
      clinicFee: number | null;
      yearsOfExperience: number | null;
      doctorId: string;
      profilePic: string | null;
    };
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
