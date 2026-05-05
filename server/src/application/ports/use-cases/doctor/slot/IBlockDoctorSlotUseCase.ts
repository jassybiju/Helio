export interface IBlockDoctorInput {
  startTime: Date;
  endTime: Date;
  reason: string;
}

export interface IBlockDoctorSlotUseCase {
  execute(doctorId: string, input: IBlockDoctorInput): Promise<void>;
}
