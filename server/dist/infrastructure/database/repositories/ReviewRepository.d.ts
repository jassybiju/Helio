import type { IReviewRepository } from "#application/ports/repositories/IReviewRepository.js";
import { BaseRepository } from "./BaseRepository.js";
import type { Review } from "#domain/entities/Review.js";
import { type ReviewRaw } from "../model/ReviewModel.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { ClientSession } from "mongoose";
export declare class ReviewRepository extends BaseRepository<Review, ReviewRaw> implements IReviewRepository {
    private readonly _logger;
    constructor(_logger: ILogger, session?: ClientSession);
    withSession(session: ClientSession): ReviewRepository;
    countReviewByPatientIdAndDoctorId(patientId: string, doctorId: string): Promise<number>;
    countRatingsByDoctorId(doctorId: string): Promise<number[]>;
    findManyByDoctorIdPaginated(doctorId: string, page: number, limit: number): Promise<Review[]>;
    findById(id: string): Promise<Review | null>;
    create(review: Review): Promise<void>;
    update(review: Review): Promise<void>;
}
//# sourceMappingURL=ReviewRepository.d.ts.map