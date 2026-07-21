import type { IReviewRepository } from "@application/ports/repositories/IReviewRepository.ts";
import { BaseRepository } from "./BaseRepository.ts";
import type { Review } from "@domain/entities/Review.ts";
import { reviewModel, type ReviewRaw } from "../model/ReviewModel.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { ClientSession } from "mongoose";
import { ReviewMapper } from "../../../mappers/ReviewMapper.ts";

export class ReviewRepository
  extends BaseRepository<Review, ReviewRaw>
  implements IReviewRepository
{
  constructor(
    private readonly _logger: ILogger,
    session?: ClientSession
  ) {
    super(reviewModel, session);
  }

  withSession(session: ClientSession) {
    return new ReviewRepository(this._logger, session);
  }

  countReviewByPatientIdAndDoctorId(
    patientId: string,
    doctorId: string
  ): Promise<number> {
    return super.count({ patient_id: patientId, doctor_id: doctorId });
  }
  async countRatingsByDoctorId(doctorId: string): Promise<number[]> {
    const response = await super.aggregate<{ counts: number[] }>([
      {
        $match: {
          doctor_id: doctorId,
        },
      },
      {
        $facet: {
          "1": [{ $match: { rating: 1 } }, { $count: "count" }],
          "2": [{ $match: { rating: 2 } }, { $count: "count" }],
          "3": [{ $match: { rating: 3 } }, { $count: "count" }],
          "4": [{ $match: { rating: 4 } }, { $count: "count" }],
          "5": [{ $match: { rating: 5 } }, { $count: "count" }],
        },
      },
      {
        $project: {
          _id: 0,
          counts: [
            { $ifNull: [{ $arrayElemAt: ["$1.count", 0] }, 0] },
            { $ifNull: [{ $arrayElemAt: ["$2.count", 0] }, 0] },
            { $ifNull: [{ $arrayElemAt: ["$3.count", 0] }, 0] },
            { $ifNull: [{ $arrayElemAt: ["$4.count", 0] }, 0] },
            { $ifNull: [{ $arrayElemAt: ["$5.count", 0] }, 0] },
          ],
        },
      },
    ]);

    return response[0]?.counts ?? [0];
  }
  findManyByDoctorIdPaginated(
    doctorId: string,
    page: number,
    limit: number
  ): Promise<Review[]> {
    const skip = (page - 1) * limit;
    return super.find(
      { doctor_id: doctorId },
      { skip, limit },
      ReviewMapper.toDomain
    );
  }
  findById(id: string): Promise<Review | null> {
    return super.findById(id, ReviewMapper.toDomain);
  }
  create(review: Review): Promise<void> {
    return super.create(review, ReviewMapper.toPersistance);
  }
  update(review: Review): Promise<void> {
    return super.update(review, review.id, ReviewMapper.toPersistance);
  }
}
