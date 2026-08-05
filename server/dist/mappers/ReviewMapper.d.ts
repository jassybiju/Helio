import { Review } from "#domain/entities/Review.js";
import type { ReviewRaw } from "#infrastructure/database/model/ReviewModel.js";
export declare class ReviewMapper {
    static toDomain(raw: ReviewRaw): Review;
    static toPersistance(review: Review): ReviewRaw;
}
//# sourceMappingURL=ReviewMapper.d.ts.map