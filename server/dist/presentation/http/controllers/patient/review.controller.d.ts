import type { IAddReview } from "#application/ports/use-cases/patient/review/IAddReview.js";
import type { NextFunction, Request, Response } from "express";
export declare class PatientReviewController {
    private readonly _addReview;
    constructor(_addReview: IAddReview);
    addReview: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=review.controller.d.ts.map