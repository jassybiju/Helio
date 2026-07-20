import type { Review } from "@domain/entities/Review.ts";
import type { ClientSession } from "mongoose";

export interface IReviewRepository {
  withSession(session: ClientSession): IReviewRepository;
  findById(id: string): Promise<Review | null>;
  create(review: Review): Promise<void>;
  update(review: Review): Promise<void>;
  findManyByDoctorIdPaginated(
    doctorId: string,
    page: number,
    limit: number
  ): Promise<Review[]>;
  countRatingsByDoctorId(doctorId: string): Promise<number[]>;
  countReviewByPatientIdAndDoctorId(
    patientId: string,
    doctorId: string
  ): Promise<number>;
}
