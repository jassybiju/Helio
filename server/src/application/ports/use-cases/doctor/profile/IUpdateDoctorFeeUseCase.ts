export interface IUpdateDoctorFeeUseCase {
  execute(
    doctorId: string,
    onlineFee: number,
    clinicFee: number
  ): Promise<void>;
}
