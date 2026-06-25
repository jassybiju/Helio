export class Review {
  constructor(
    private readonly _id: string,

    private readonly _doctorId: string,
    private readonly _patientId: string,

    private readonly _rating: number,
    private readonly _comments: string,

    private readonly _createdAt: Date,
    private readonly _updatedAt?: Date
  ) {}

  static create({
    id,
    doctorId,
    patientId,
    rating,
    comments,
  }: {
    id: string;
    doctorId: string;
    patientId: string;
    rating: number;
    comments: string;
  }) {
    return new Review(
      id,
      doctorId,
      patientId,
      rating,
      comments,
      new Date(),
      new Date()
    );
  }

  get id() {
    return this._id;
  }
  get doctorId() {
    return this._doctorId;
  }
  get patientId() {
    return this._patientId;
  }
  get rating() {
    return this._rating;
  }
  get comments() {
    return this._comments;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
