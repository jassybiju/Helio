export interface IDeleteDoctorBlockSlotUseCase {
  execute(doctorId: string, blockId: string): Promise<void>;
}
