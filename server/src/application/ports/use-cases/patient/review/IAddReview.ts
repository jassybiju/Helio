export interface IAddReview {
  execute(
    patientId: string,
    doctorId: string,
    data: { comment: string; rating: number }
  ): Promise<void>;
}
