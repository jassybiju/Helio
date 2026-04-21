export interface IDeleteDoctorScheduleUseCase {
  execute(shiftId: string, doctorId: string): Promise<void>;
}
