export interface IUpdateDoctorInput {
  doctorId: string;
  fullName: string;
  specialization: string;
  bio: string;
}

export interface IUpdateDoctorProfileUseCase {
  execute(input: IUpdateDoctorInput): Promise<void>;
}
