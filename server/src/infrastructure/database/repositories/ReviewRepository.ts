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
