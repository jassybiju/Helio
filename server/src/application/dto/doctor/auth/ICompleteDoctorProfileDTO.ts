export type ICompleteDoctorProfileRequestDTO = {
  gender: string;

  specialization: string;
  career_start_year: number;

  document: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  };
};

export type ICompleteDoctorProfileResponseDTO = {
  isProfileComplete: boolean;
};
