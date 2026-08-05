import { BaseRepository } from "./BaseRepository.js";
import { reviewModel } from "../model/ReviewModel.js";
import { ReviewMapper } from "../../../mappers/ReviewMapper.js";
export class ReviewRepository extends BaseRepository {
    _logger;
    constructor(_logger, session) {
        super(reviewModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new ReviewRepository(this._logger, session);
    }
    countReviewByPatientIdAndDoctorId(patientId, doctorId) {
        return super.count({ patient_id: patientId, doctor_id: doctorId });
    }
    async countRatingsByDoctorId(doctorId) {
        const response = await super.aggregate([
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
    findManyByDoctorIdPaginated(doctorId, page, limit) {
        const skip = (page - 1) * limit;
        return super.find({ doctor_id: doctorId }, { skip, limit }, ReviewMapper.toDomain);
    }
    findById(id) {
        return super.findById(id, ReviewMapper.toDomain);
    }
    create(review) {
        return super.create(review, ReviewMapper.toPersistance);
    }
    update(review) {
        return super.update(review, review.id, ReviewMapper.toPersistance);
    }
}
//# sourceMappingURL=ReviewRepository.js.map