export type IRegisterDoctorRequestDTO = {
  email: string;
  password: string;

  fullName: string;
  gender: string;

  specialization: string;
  careerStartYear: number;

  document: {
    buffer: Buffer;
    mimetype: string;
    filename: string;
  };
};

export type IRegisterDoctorReponseDTO = {
  status: string;
};
