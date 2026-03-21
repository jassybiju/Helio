export type IRegisterDoctorRequestDTO = {
  email: string;
  password: string;

  full_name: string;
  gender: string;

  specialization: string;
  career_start_year: number;

  document: {
    buffer: Buffer;
    mimetype: string;
    filename: string;
  };
};

export type IRegisterDoctorReponseDTO = {
  status: string;
  email: string;
  id: string;
  otp_invalid_at: string;
};
