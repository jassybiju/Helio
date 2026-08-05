export declare class Review {
    private readonly _id;
    private readonly _doctorId;
    private readonly _patientId;
    private readonly _rating;
    private readonly _comments;
    private readonly _createdAt;
    private readonly _updatedAt?;
    constructor(_id: string, _doctorId: string, _patientId: string, _rating: number, _comments: string, _createdAt: Date, _updatedAt?: Date | undefined);
    static create({ id, doctorId, patientId, rating, comments, }: {
        id: string;
        doctorId: string;
        patientId: string;
        rating: number;
        comments: string;
    }): Review;
    get id(): string;
    get doctorId(): string;
    get patientId(): string;
    get rating(): number;
    get comments(): string;
    get createdAt(): Date;
    get updatedAt(): Date | undefined;
}
//# sourceMappingURL=Review.d.ts.map