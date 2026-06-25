import { Review } from "@domain/entities/Review.ts";
import type { ReviewRaw } from "@infrastructure/database/model/ReviewModel.ts";

export class ReviewMapper {
  static toDomain(raw: ReviewRaw): Review {
    return new Review(
      raw._id,
      raw.doctor_id,
      raw.patient_id,
      raw.rating,
      raw.comments,
      new Date(raw.created_at!) ?? null,
      new Date(raw.updated_at!) ?? null
    );
  }
  static toPersistance(review: Review): ReviewRaw {
    return {
      _id: review.id,
      doctor_id: review.doctorId,
      patient_id: review.patientId,
      rating: review.rating,
      comments: review.comments,
      created_at: review?.createdAt ?? null,
      updated_at: review?.updatedAt ?? null,
      is_deleted : false
    };
  }
}
